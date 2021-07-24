/* eslint-disable */
import size from 'lodash/size';
export default (schema, value, required) => {
  if (required && (!value || !value.length)) {
    return ({ message: `This field is required` });
  }
  if (schema.pattern === 'phone') {
    if (value && !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(value)) {
      return ({ message: `Invalid phone format. Must be e.g. +1777222333` });
    }
  } else {
    if (schema.pattern === 'email') {
      if (value && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
        return ({ message: `Invalid email format` });
      }
    } else {
      if (schema.pattern && value && !RegExp(schema.pattern).test(value)) {
        // return ({ message: `'${schema.title}' must ma tch pattern ${schema.pattern}` });
        return ({ message: `Must match pattern ${schema.pattern}` });
      }
    }
  }
  return null;
};
