import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { datetimeByUser, dateToUTCTime } from '@helpers/functions';

export default ({ path, label, value, type, onChange, ...rest }) => {

    const onChangeDatetime = (d, s) => {
        let utcTime = dateToUTCTime(d, 'MM-DD-YYYY');
        onChange(String(utcTime/1000));
    }

    const usertime = datetimeByUser(value);
    console.log('datepicker', usertime);
    return (
        <KeyboardDatePicker
            value={value} // === '' ? new Date() : value}
            inputValue={usertime}
            label={label}
            onChange={onChangeDatetime}
            format="MM-dd-yyyy"
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