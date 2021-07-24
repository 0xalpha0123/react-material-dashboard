import React from 'react';
import { KeyboardTimePicker } from '@material-ui/pickers';

export default ({ path, label, value, type, onChange, ...rest }) => {
    return (
        <KeyboardTimePicker
            value={value} // === '' ? new Date() : value}
            label={label}
            onChange={onChange}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
            {...rest}
            InputAdornmentProps={{
                position: "start"
            }}

        />
    )
};