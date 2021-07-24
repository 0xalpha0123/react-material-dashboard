import size from 'lodash/size';

export default (schema, value, required) => {
  if (required && (!value || !value.length)) {
    return ({ message: `This field is required` });
  }
  if ((schema.minLength !== undefined) && (size(value) < schema.minLength)) {
    // return ({ message: `'${schema.title}' must be at least ${schema.minLength}` });
    return ({ message: `Must be at least ${schema.minLength}` });
  }
  return null;
};
