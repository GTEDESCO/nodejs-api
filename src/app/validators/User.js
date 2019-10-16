import * as Yup from 'yup';

export const storeSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .required()
    .min(6),
});

export const updateSchema = Yup.object().shape({
  id: Yup.integer().required(),
});
