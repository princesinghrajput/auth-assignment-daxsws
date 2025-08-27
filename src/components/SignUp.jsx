import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from './TextField';
import Button from '@mui/material/Button';
import { signupSchema } from '../utils/validationSchemas';

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    try {
      await signupSchema.validate(formData, { abortEarly: false });
      
      // Simulate API call
      setTimeout(() => {
        alert('Account created successfully!');
        navigate('/');
        setIsLoading(false);
      }, 1500);
      
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
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
