import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Must be at least 3 characters')
    .trim(),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Must be at least 6 characters')
});

export const signupSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Must be at least 2 characters'),

  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Must be at least 3 characters'),

  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),

  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^\+\d{10,15}$/, 'Phone must include country code (e.g. +919876543210)'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Must be at least 6 characters')
    .notOneOf([yup.ref('username')], 'Password cannot be the same as username'),

  confirmPassword: yup
    .string()
    .required('Confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match')
});
