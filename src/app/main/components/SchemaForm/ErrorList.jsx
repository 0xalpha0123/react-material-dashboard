import React from 'react';
import keys from 'lodash/keys';
import { withStyles } from '@material-ui/core/styles';
import filter from 'lodash/filter';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

const errorsStyles = {
  errorList: {
    backgroundColor: '#ffa3a3',
    borderColor: '#ebccd1',
    color: '#f44336',
    clear: 'both',
  },
  panelHeading: {
    color: '#a94442',
    backgroundColor: '#f98989',
    borderColor: '#ebccd1',
  },
};

const Error = ({ errors }) => (
  <ListItemText primary={errors.message} />
);

const Errors = ({ errors, anchor, classes }) => (
  <ListItem
    button
    onClick={() => {
      document.getElementById(anchor).focus(); // eslint-disable-line
    }}
  >
    {
      errors.map((v, idx) => (<Error key={idx} errors={v} classes={classes} />)) // eslint-disable-line react/no-array-index-key,max-len
    }
  </ListItem>
);

const hasErrors = (errors) => {
  let errorsFlag = false;
  Object.values(errors).forEach((error) => {
    if (error && error.length !== 0) {
      errorsFlag = true;
    }
  });
  return errorsFlag;
};

const ErrorList = ({ errors, field, classes }) => (
  <div className={classes.errorList}>
    {
      hasErrors(errors) ? (
        <List
          component='nav'
        // subheader={(
        //   <ListItem className={classes.panelHeading}>
        //     <ListItemIcon>
        //       <ErrorOutline color='error' />
        //     </ListItemIcon>
        //     <ListItemText primary='ERRORS' color='error' />
        //   </ListItem>
        // )}
        >
          {
            filter(keys(errors), (k) => {
              const v = errors[k];
              return v && v.length > 0;
            }).map(v => (
              <Errors key={v} errors={errors[v]} anchor={`${field}_${v}`} classes={classes} />
            ))
          }
        </List>
      ) : null
    }
  </div>
);

export default withStyles(errorsStyles)(ErrorList);
