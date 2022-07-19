import Joi from "joi-browser";
const productSchema = {
  productName: Joi.string().required().label("Product Name"),
  productNo: Joi.any(),
  catNo: Joi.any(),
  oldPrice: Joi.number().positive().label("Old Price") || Joi.any,
  price: Joi.number().required().positive().label("Price"),
  picName: Joi.required().label("Picture"),
  code: Joi.any(),
  madeIn: Joi.any(),
  canvasType: Joi.any(),
  comments: Joi.any(),
  isActive: Joi.any(),
  catName: Joi.any(),
  productColors: Joi.any(),
};

const ProductValidation = (data) => {
  return Validate(data, productSchema);
};

const Validate = (data, schema) => {
  const errors = Joi.validate(data, schema, {
    abortEarly: false,
  });
  return errors.error ? errors.error.details : [];
};

export { ProductValidation };
