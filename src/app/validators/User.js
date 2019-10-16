import * as Yup from 'yup';

export const storeSchema = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });
    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Campos inválidos', messages: err.inner });
  }
};

export const updateSchema = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });
    await schema.validate(req.params, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Campos inválidos', messages: err.inner });
  }
};
