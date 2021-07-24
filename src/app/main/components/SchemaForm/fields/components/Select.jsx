import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

export default ({ type, value = '', options, nullOption, onChange, label, variant, className, InputLabelProps, helperText, ...rest }) => {
  
  return (
  <FormControl variant={variant} className={className} error={helperText!==undefined && helperText.trim()!==''}>
    <InputLabel required={InputLabelProps.required} htmlFor={InputLabelProps.htmlFor}>{label}</InputLabel>
    <Select
      {...rest}
      label={label}
      value={String(value)}
      onChange={onChange}
    >
      {value === null && <MenuItem value={''}>{nullOption}</MenuItem>}
      {options.map(o => <MenuItem key={o.key} value={String(o.key)}>{String(o.value)}</MenuItem>)}
    </Select>
    <FormHelperText>{helperText}</FormHelperText>
  </FormControl>
  )
}
;
