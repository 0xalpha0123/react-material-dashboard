import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default ({
  type,
  value = null,
  options,
  nullOption,
  onChange,
  label,
  variant,
  className,
  InputLabelProps,
  helperText,
  ...rest
}) => {
  const handleOnChange = (e, value) => {
    let _value = null;
    if (value) _value = value.key;

    onChange && onChange({ target: { value: _value } });
  };

  const _value = options.find((o) => o.key === value);

  return (
    <FormControl
      variant={variant}
      className={className}
      error={helperText !== undefined && helperText.trim() !== ""}
    >
      <Autocomplete
        {...rest}
        id={InputLabelProps.htmlFor}
        options={options}
        getOptionLabel={(option) => option.value}
        value={_value ? _value : null}
        onChange={handleOnChange}
        renderInput={(params) => (
          <TextField
            {...params}
            required={InputLabelProps.required}
            label={label}
            variant={variant}
          />
        )}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
