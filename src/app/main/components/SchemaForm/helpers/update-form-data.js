import update from 'immutability-helper';
import size from 'lodash/size';

const arrRegex = /^([^.]+)\[([0-9]+)\](\.(.*))?/;
const dotRegex = /^([^[]+)\.(.*$)/;

const applyAtPath = (path, data, spec) => {
  if (!path) return spec(data);
  const dotMatch = path.match(dotRegex);
  const arrMatch = path.match(arrRegex);
  if (!dotMatch && !arrMatch) {
    return { [path]: spec(data[path]) };
  }
  if (dotMatch) {
    const subPath = dotMatch[1];
    const prop = dotMatch[2];
    return { [subPath]: applyAtPath(prop, data[subPath], spec) };
  }
  if (arrMatch) {
    const subPath = arrMatch[1];
    const index = Number(arrMatch[2]);
    return { [subPath]: { [index]: applyAtPath(arrMatch[4], data[subPath][index], spec) } };
  }
  return {};
};

const setValueSpec = value => () => {
  if (!Array.isArray(value) && typeof value === 'object' && size(value) === 1) return value;
  return ({ $set: value });
};
const pushItemSpec = value => (data) => {
  if (data) return ({ $push: [value] });
  return ({ $set: [value] });
};
const removeItemSpec = idx => () => ({ $splice: [[idx, 1]] });
const moveItemSpec = (idx, direction) => value => ({
  [idx]: { $set: value[idx + direction] },
  [idx + direction]: { $set: value[idx] },
});

export default (data, path, value) => {
  const s = setValueSpec(value);
  const spec = applyAtPath(path, data, s);
  return update(data, spec);
};

export const addListItem = (data, path, value) => {
  const spec = applyAtPath(path, data, pushItemSpec(value));
  return update(data, spec);
};

export const removeListItem = (data, path, index) => {
  const spec = applyAtPath(path, data, removeItemSpec(index));
  return update(data, spec);
};

export const moveListItem = (data, path, index, direction) => {
  const spec = applyAtPath(path, data, moveItemSpec(index, direction));
  return update(data, spec);
};
