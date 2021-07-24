export default (schema, value, required) => {
  if (required && (!value || !value.length)) {
    return ({ message: `This field is required` });
  }
  if (schema.minimum && typeof value === 'number' && value < schema.minimum) {
    // return ({ message: `'${schema.title}' should be >= ${schema.minimum}` });
    return ({ message: `Should be >= ${schema.minimum}` });
  }
  return null;
};
