import size from 'lodash/size';

export default (schema, value, required) => {
  if (required && (!value || !value.length)) {
    return ({ message: `This field is required` });
  }
  return null;
};
