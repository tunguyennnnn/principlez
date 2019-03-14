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
    .length(4, 'Example 1975'),
});

export const login = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email(),
  password: yup
    .string()
    .trim()
    .min(8, 'Invalid password'),
});
