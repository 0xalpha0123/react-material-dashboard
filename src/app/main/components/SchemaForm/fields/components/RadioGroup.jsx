import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

export default ({ path, options = [], value, onChange, inputProps, nullOption, label, className, variant, InputLabelProps, helperText, ...rest }) => (
  <FormControl className={className} error={helperText !== undefined && helperText.trim() !== ''}>
    <FormLabel component="legend" required={InputLabelProps.required} htmlFor={InputLabelProps.htmlFor}>{label}</FormLabel>
    <RadioGroup
      {...rest}
      aria-label={path}
      name={path}
      value={String(value)}
      onChange={onChange}
    >
      {options.map(o => <FormControlLabel key={o.key} value={String(o.key)} control={<Radio />} label={o.value} />)}
    </RadioGroup>
    <FormHelperText>{helperText}</FormHelperText>
  </FormControl>
);
