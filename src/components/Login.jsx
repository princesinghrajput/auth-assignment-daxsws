import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TextField from './TextField';
import { loginSchema } from '../utils/validationSchemas';
import Button from '@mui/material/Button';
import AuthService from '../services/auth/authService';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field-specific errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Clear general error when user starts typing
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    try {
      // Client-side validation first
      await loginSchema.validate(formData, { abortEarly: false });
      
      const result = await AuthService.login(formData);
      
      if (result.success) {
          toast.success('Login successful! Welcome back.');
          navigate('/hero');
        } else {
          if (result.validationErrors) {
            setErrors(result.validationErrors);
          } else {
            setErrors({ general: result.message });
          }
        }
      
    } catch (validationErrors) {
      if (validationErrors.inner) {
        // Yup validation errors
        const newErrors = {};
        validationErrors.inner.forEach(error => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else {
        setErrors({ general: 'An error occurred. Please try again.' });
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 " style={{ backgroundColor: '#B8D4D4' }}>
      <div className="w-full max-w-lg bg-white shadow-xl">
        <div className="bg-teal-600 text-white text-center py-6">
          <h1 className="text-2xl font-bold mb-1">Login</h1>
          <p className="text-teal-100 text-sm">Sign in to continue</p>
        </div>

        <div className="px-8 py-6">
          <form onSubmit={handleSubmit}>
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-md">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-sm">Login Failed</p>
                    <p className="text-sm">{errors.general}</p>
                  </div>
                </div>
              </div>
            )}
            
            <TextField
              label="USERNAME"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onFocus={() => errors.general && setErrors(prev => ({ ...prev, general: '' }))}
              error={errors.username}
            />

            <TextField
              label="PASSWORD"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => errors.general && setErrors(prev => ({ ...prev, general: '' }))}
              error={errors.password}
              showPasswordToggle
            />

            <div className="mb-4 mt-4 flex justify-center">
              <Button 
                variant="contained" 
                type="submit" 
                disabled={isLoading}
                sx={{
                  backgroundColor: '#008080', 
                  color: '#fff',
                  '&:disabled': {
                    backgroundColor: '#9ca3af',
                  }
                }}
              >
                {isLoading ? 'LOGGING IN...' : 'LOGIN'}
              </Button>
            </div>

            <div className="text-center">
              <span className="text-gray-600 text-sm">Don't have Account? </span>
              <Link to="/signup" className="text-teal-600 hover:text-teal-700 font-semibold text-sm">
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;