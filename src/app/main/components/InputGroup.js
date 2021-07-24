import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton} from '@material-ui/core';
import { Visibility, VisibilityOff, Wifi } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    textFiled: {
        width: '25ch'
    }
}));

export default function InputGroup (props) {

    const classes = useStyles();
    const [values, setValues] = React.useState({
        value: '',
        showValue: false
    });

    const handleShowPassword = () => {
        setValues({
            ...values, showValue: !values.showValue
        });
    };

    return (
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" color="secondary" fullWidth>
            <InputLabel htmlFor={props.name}>{props.labelText}</InputLabel>
            <OutlinedInput
                labelWidth={props.labelText.length * 8}
                id={props.name}
                name={props.name}
                value={props.value}
                defaultValue={props.defaultValue}
                disabled={props.name === 'mac' || props.disabled}
                inputProps={{min: props.min, max: props.max}}
                type={ props.type !== "password" ? props.type : values.showValue ? "text" : "password" }
                onChange={(event) => {props.handleChange(event.target.value)}}
                endAdornment={
                    props.type === "password" ? 
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                onClick={handleShowPassword}
                            >
                            {values.showValue ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    : props.name === "client_ssid" ?
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                            >
                                <Wifi />
                            </IconButton>
                        </InputAdornment>
                    : ''
                }
            />
        </FormControl>
    )
}