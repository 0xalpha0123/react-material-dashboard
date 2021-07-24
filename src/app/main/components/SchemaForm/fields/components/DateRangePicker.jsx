import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// React DateRangePicker
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
//import './react_dates_overrides.css';

export default ({ path, label, value, type, onChange, ...rest }) => (
    <FormControlLabel
        control={
            <DateRangePicker
                startDateId="startDate"
                endDateId="endDate"
                onDatesChange={onChange}
                orientation="vertical"
                openDirection="down"
                onFocusChange={onChange}
                {...rest}
            />
        }
    />
);

