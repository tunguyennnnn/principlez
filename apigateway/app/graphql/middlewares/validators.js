import * as yup from 'yup';

export const signup = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email(),
  fullname: yup
    .string()
    .trim()
    .min(3, 'Fullname is too short')
    .matches(/^[a-zA-Z-_0-9 \.]+$/, 'Invalid name'),
  yearOfBirth: yup
    .string()
    .trim()
    .length(4, 'Year of birth example: 1975'),
  password: yup
    .string()
    .trim()
    .min(8, 'Invalid password'),
});

export const login = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email(),
});

export const updateUserInfo = yup.object().shape({
  fullname: yup
    .string()
    .trim()
    .min(3, 'Fullname must be at least 3 characters long')
    .matches(/^[a-zA-Z-_0-9 \.]+$/, 'Invalid name'),
  yearOfBirth: yup
    .string()
    .trim()
    .length(4, 'Year of birth example: 1975'),
});

export const search = yup.object().shape({
  text: yup.string().trim(),
});
