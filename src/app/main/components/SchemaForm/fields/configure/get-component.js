// import Input, { InputLabel } from 'material-ui/Input'; // eslint-disable-line import/no-named-default
const TextField = require('@material-ui/core/TextField').default;

const { RadioGroup, Select, MultiSelect, AutoComplete, Checkbox, DatePicker, DateRangePicker, TimePicker, CameraFeed, Switch } = require('../components');

export default ({ schema, uiSchema = {} }) => {
  const widget = uiSchema['ui:widget'];
  const { type } = schema;

  if (schema.enum) {
    if (widget === 'radio') {
      return RadioGroup;
    }
    if (widget === 'checkboxes') {
      return Checkbox;
    }
    if(widget === 'multiple'){
      return MultiSelect;
    }
    if(widget === 'autocomplete'){
      return AutoComplete;
    }
    return Select;
  }
  if (type === 'boolean') {
    return Switch;
  }
  if (widget === 'date') {
    return DatePicker;
  }
  if (widget === 'time') {
    return TimePicker;
  }
  if (widget === 'daterangepicker') {
    return DateRangePicker;
  }
  if (widget === 'imagecapture') {
    return CameraFeed;
  }
  
  return TextField;
};
