# React Login & Sign-Up Application

A simple React application featuring login and sign-up functionality with form validation and a hero section.

## Assignment Features

- **Login & Sign-Up Forms**: Complete authentication flow with validation
- **Form Validation**: Real-time validation using Yup schema
- **Hero Section**: Simple landing page after successful login
- **Responsive Design**: Works on all device sizes
- **Modern UI**: Clean interface with Material-UI and Tailwind CSS

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the application**
   ```bash
   npm run dev
   ```

3. **Open browser**
   Navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── TextField.jsx      # Reusable input component
│   ├── Login.jsx          # Login page
│   ├── SignUp.jsx         # Registration page
│   └── Hero.jsx           # Hero section (Assignment Done!)
├── utils/
│   └── validationSchemas.js # Yup validation schemas
├── App.jsx                # Main app with routing
└── main.jsx              # Entry point
```

## How It Works

1. **Login Page** (`/`) - Enter username and password
2. **Sign-Up Page** (`/signup`) - Register with full form validation
3. **Hero Section** (`/hero`) - Displays "Assignment Done!" after login

## Validation Rules

- **Name**: Alphabets only, required
- **Username**: Alphanumeric with special characters
- **Email**: Valid email format required
- **Phone**: 10-digit number required
- **Password**: Minimum 6 characters, cannot match username
- **Confirm Password**: Must match password

## Technologies

- React 19
- React Router DOM
- Material-UI
- Tailwind CSS
- Yup (validation)
- Vite

## Assignment Completed ✅

This project demonstrates:
- Form handling and validation
- Component-based architecture
- Routing and navigation
- Responsive design
