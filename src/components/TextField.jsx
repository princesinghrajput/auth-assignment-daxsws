import { useState } from 'react';
import { TextField as MuiTextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const TextField = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  error, 
  showPasswordToggle = false,
  placeholder,
  autoComplete,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle && showPassword ? 'text' : type;

  return (
    <MuiTextField
      id={`${name}-field`}
      label={label}
      variant="standard"
      type={inputType}
      name={name}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error}
      placeholder={placeholder}
      autoComplete={autoComplete}
      fullWidth
      sx={{
        mb: 2,
        '& .MuiInput-underline:before': {
          borderBottomColor: '#d1d5db',
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
          borderBottomColor: '#0d9488',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: '#0d9488',
        },
        '& .MuiInput-underline.Mui-error:after': {
          borderBottomColor: '#ef4444',
        },
        '& .MuiInputLabel-root': {
          color: '#6b7280',
          fontSize: '14px',
          fontWeight: 500,
          '&.Mui-focused': {
            color: '#0d9488',
          },
          '&.Mui-error': {
            color: '#ef4444',
          },
        },
        '& .MuiInputBase-input': {
          fontSize: '16px',
          paddingTop: '16px',
          paddingBottom: '8px',
          color: '#374151',
          '&::placeholder': {
            color: '#9ca3af',
            opacity: 0.7,
          },
        },
        '& .MuiFormHelperText-root': {
          fontSize: '12px',
          marginLeft: 0,
          marginTop: '4px',
          '&.Mui-error': {
            color: '#ef4444',
          },
        },
      }}
      InputProps={{
        ...(showPasswordToggle && {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                size="small"
                sx={{ 
                  color: '#6b7280',
                  '&:hover': {
                    color: '#0d9488',
                  }
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
            </InputAdornment>
          ),
        }),
      }}
      {...props}
    />
  );
};

export default TextField;
