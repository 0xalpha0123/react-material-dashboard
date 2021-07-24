import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
	alertClass: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(0),
        },
        marginBottom: '12px',
        marginTop: '12px',
        backgroundColor: '#5d5941',
        borderRadius: '3px',
        padding: '5px 10px'
    },
    
}));

function CustomAlert(props) {
    const classes = useStyles(props);

    return (
        <div className={classes.alertClass}>
            {/* <Alert icon={false} color="success" variant="filled"> */}
                <Typography variant={props.size} color="secondary">
                    {props.content}
                </Typography>
            {/* </Alert> */}
        </div>
	);
}

export default CustomAlert;