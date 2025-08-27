import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from './TextField';

import { loginSchema } from '../utils/validationSchemas';
import Button from '@mui/material/Button';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await loginSchema.validate(formData, { abortEarly: false });
      
      // Handle successful validation
      navigate('/hero');
      
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#B8D4D4' }}>
      <div className="w-full max-w-lg bg-white shadow-xl">
        <div className="bg-teal-600 text-white text-center py-6">
          <h1 className="text-2xl font-bold mb-1">Login</h1>
          <p className="text-teal-100 text-sm">Sign in to continue</p>
        </div>

        <div className="px-8 py-6">
          <form onSubmit={handleSubmit}>
            <TextField
              label="USERNAME"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
            />

            <TextField
              label="NEW PASSWORD"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              showPasswordToggle
            />

            <div className="mb-4 mt-4 flex justify-center">
            <Button variant="contained" type="submit" sx={{backgroundColor: '#008080', color: '#fff'}}>LOGIN</Button>
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