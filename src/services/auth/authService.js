import api from '../axiosInterceptor';

class AuthService {
  // Register new user
  static async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.data.success) {
        // Don't auto-login, just return success
        return { success: true, data: response.data.data };
      }
      
      return { success: false, message: response.data.message };
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle validation errors
      if (error.response?.data?.errors) {
        const validationErrors = {};
        error.response.data.errors.forEach(err => {
          validationErrors[err.path] = err.msg;
        });
        return { success: false, validationErrors };
      }
      
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed. Please try again.'
      };
    }
  }

  // Login user
  static async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.success) {
        // Store token and user data
        const { token, user } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true, data: response.data.data };
      }
      
      return { success: false, message: response.data.message };
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle validation errors
      if (error.response?.data?.errors) {
        const validationErrors = {};
        error.response.data.errors.forEach(err => {
          validationErrors[err.path] = err.msg;
        });
        return { success: false, validationErrors };
      }
      
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please try again.'
      };
    }
  }

  // Get user profile
  static async getProfile() {
    try {
      const response = await api.get('/auth/profile');
      return { success: true, data: response.data.data };
    } catch (error) {
      console.error('Get profile error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get profile.'
      };
    }
  }

  // Logout user
  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  // Check if user is authenticated
  static isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  // Get current user from localStorage
  static getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Get auth token
  static getToken() {
    return localStorage.getItem('token');
  }
}

export default AuthService;
