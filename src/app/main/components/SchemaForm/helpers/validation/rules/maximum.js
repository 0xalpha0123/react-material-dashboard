export default (schema, value, required) => {
  if (required && (!value || !value.length)) {
    return ({ message: `This field is required` });
  }
  if (schema.maximum && typeof value === 'number' && value > schema.maximum) {
    // return ({ message: `'${schema.title}' should be <= ${schema.maximum}` });
    return ({ message: `Should be <= ${schema.maximum}` });
  }
  return null;
};
