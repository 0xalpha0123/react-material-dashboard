import update from 'immutability-helper';
import forOwn from 'lodash/forOwn';
import mapValues from 'lodash/mapValues';
import keys from 'lodash/keys';
import rules from './rules';

const validationResult = (schema, value, required) => {
  const rv = [];
  forOwn(rules, (rule, ruleId) => {
    const result = rule(schema, value, required);
    if (result) {
      rv.push({
        rule: ruleId,
        ...result,
      });
    }
  });
  return rv;
};

const getFieldSpecRec = (schema, value, required) => {
  let retValue = { $set: [] };
  if (value === null) {
    return retValue;
  }
  if (typeof value !== 'object' || schema.type === 'multiple') {
    retValue = { $set: validationResult(schema, value, required) };
  } else {
    if (schema.type === 'complex') {
      retValue = Object.values(schema.properties).map((prop) => (
        mapValues(prop.properties, (s, p) => getFieldSpecRec(s, value[p], prop.required ? prop.required.includes ? prop.required.includes(p) : false : false))
      ));
      let jsonResult = {};
      retValue.map((item) => (
        Object.keys(item).map((key) => (
          jsonResult = {
            ...jsonResult,
            [key]: item[key],
          }
        ))
      ));
      retValue = jsonResult;
    } else {
      retValue = mapValues(schema.properties, (s, p) => getFieldSpecRec(s, value[p], schema.required ? schema.required.includes ? schema.required.includes(p) : false : false));
    }
  }
  return retValue;
}

const getFieldSpec = (schema, value) => {
  return getFieldSpecRec(schema, value);
};

export default (schema, data) => {
  const spec = getFieldSpec(schema, data);
  return update({}, spec);
};
