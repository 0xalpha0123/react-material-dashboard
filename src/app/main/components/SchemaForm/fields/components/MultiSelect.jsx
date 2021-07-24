import React, {useState} from 'react';
import { 
  InputLabel,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import Select from 'react-select';

const controlStyles = {
 control: styles => ({
   ...styles,
   height: "54px"
  })
};

const getOptions = (options) => {
  if(!options || !options.length || !Array.isArray(options)) return [];

  let _options = [];
  options.forEach(o => {
    _options.push({
      value: o.key,
      label: o.value
    })
  });

  return _options;
}

const getKeys = (values) => {
  if(!values || !values.length || !Array.isArray(values)) return [];
  
  let _keys = [];
  values.forEach(v => {
    _keys.push(v.value);
  });

  return _keys;
}

const getValues = (keys, options) => {
  if(!keys || !keys.length || !Array.isArray(keys)) return [];
  if(!options || !options.length || !Array.isArray(options)) return [];
  
  let keyNums = {};
  for(let i = 0; i < options.length; i++){
    keyNums[options[i].value] = i;
  };

  let _values = [];
  keys.forEach(k => {
    _values.push( options[ keyNums[k] ]);
  });
  
  return _values;
}

export default ({ type, value = [], options, nullOption, onChange, label, variant, className, InputLabelProps, helperText, ...rest }) => {
  const [isActiveLabel, setIsActiveLabel] = useState(value && value.length ? true : false);
  const [isFocus, setFocus] = useState(false);
  const [values, setValues] = useState([]);

  const handleChange = value => {
    if(!value) value = [];
    setValues(value);
    onChange({target: {value: getKeys(value)}});
  };

  const handleBlur = () => {
    setFocus(false);
    if(!values || !values.length) setIsActiveLabel(false);
  };

  const handleFocus = () => {
    setFocus(true);
    setIsActiveLabel(true);
  };

  const labelClass = isActiveLabel ? "Mui-focused MuiInputLabel-shrink" : "";
  const rootStyle = isFocus ? {zIndex: 2} : {zIndex: 0};
  const _options = getOptions(options);
  
  return (
    <FormControl style={rootStyle} variant={variant} className={className} error={helperText!==undefined && helperText.trim()!==''}>
      <InputLabel className={`${labelClass} c-multi__select-label`} required={InputLabelProps.required} htmlFor={InputLabelProps.htmlFor}>{label}</InputLabel>
      <Select
        value={getValues(value, _options)}
        placeholder=""
        isMulti
        name="colors"
        options={_options}
        className="c-multi__select"
        styles={controlStyles}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />  
      
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
};
