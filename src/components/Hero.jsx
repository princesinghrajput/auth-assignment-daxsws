import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Hero = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#B8D4D4' }}>
      <div className="text-center">
        <div className="bg-white shadow-xl rounded-lg p-12 max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-teal-600 mb-4">
              🎉 Assignment Done!
            </h1>
            <p className="text-gray-600 text-lg">
              Welcome to your dashboard
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <p className="text-teal-800 text-sm">
                You have successfully completed the login flow
              </p>
            </div>
            
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                color: '#0d9488',
                borderColor: '#0d9488',
                '&:hover': {
                  backgroundColor: '#f0fdfa',
                  borderColor: '#0f766e',
                }
              }}
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
