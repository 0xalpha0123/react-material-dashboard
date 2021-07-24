import size from 'lodash/size';

export default (schema, value, required) => {
  if (required && (!value || !value.length)) {
    return ({ message: `This field is required` });
  }
  if (schema.maxLength && size(value) > schema.maxLength) {
    // return ({ message: `'${value}' exceeds the maximum length of ${schema.maxLength} for field '${schema.title}'` });
    return ({ message: `Exceeds the maximum length of ${schema.maxLength} for field '${schema.title}'` });
  }
  return null;
};
