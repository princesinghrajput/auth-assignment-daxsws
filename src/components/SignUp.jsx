import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TextField from './TextField';
import Button from '@mui/material/Button';
import { signupSchema } from '../utils/validationSchemas';
import AuthService from '../services/auth/authService';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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
      await signupSchema.validate(formData, { abortEarly: false });
      
      // Call API
      const result = await AuthService.register(formData);
      
      if (result.success) {
    
        toast.success('Account created successfully! Please login with your credentials.');
        navigate('/');
      } else {
        
        if (result.validationErrors) {
          setErrors(result.validationErrors);
          toast.error('Please check the form for errors.');
        } else {
          setErrors({ general: result.message });
          toast.error(result.message);
        }
      }
      
    } catch (validationErrors) {
      if (validationErrors.inner) {
        
        const newErrors = {};
        validationErrors.inner.forEach(error => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
        toast.error('Please check the form for errors.');
      } else {
        setErrors({ general: 'An error occurred. Please try again.' });
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8" 
         style={{ backgroundColor: '#B8D4D4' }}>
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="text-white text-center py-6 px-4" style={{ backgroundColor: '#0d9488' }}>
          <h1 className="text-xl sm:text-2xl font-bold">Create Account</h1>
          <p className="text-teal-100 text-sm mt-1">Join us today</p>
        </div>

        <div className="px-6 py-8 sm:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-800 rounded-md flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{errors.general}</span>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                autoComplete="given-name"
              />
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
                autoComplete="username"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <TextField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                autoComplete="email"
              />
              <TextField
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                autoComplete="tel"
                placeholder="1234567890"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <TextField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                showPasswordToggle
                autoComplete="new-password"
              />
              <TextField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                showPasswordToggle
                autoComplete="new-password"
              />
            </div>

            <div className="mb-4 mt-4 flex justify-end">
              <Button 
                variant="contained" 
                type="submit"
                size="large"
                disabled={isLoading}
                sx={{
                  backgroundColor: '#0d9488',
                    color: '#fff',
                    py: 1.5,
                  fontSize: '16px',
                  fontWeight: '600',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#0f766e',
                  },
                  '&:disabled': {
                    backgroundColor: '#9ca3af',
                  }
                }}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </div>

            <div className="text-center pt-4">
              <span className="text-gray-600 text-sm">Already have an account? </span>
              <Link 
                to="/" 
                className="text-teal-600 hover:text-teal-700 font-semibold text-sm underline"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
