import React, { Fragment } from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import isEqual from 'lodash/isEqual';

import fieldStyles from './field-styles';

// for unit testing only
export class RawConfiguredField extends React.Component {
  // shouldComponentUpdate = nextProps => {
  //   const { data, errors, componentProps } = this.props;
  //   if ( !isEqual(data, nextProps.data) || (this.checkCustomError(nextProps.errors)) ) {
  //     return true;
  //   }
  //   return false;
  // };
  
  // checkCustomError = (nextErrors) => {
  //   const { errors, labelComponentProps } = this.props;
  //   const { htmlFor } = labelComponentProps;

  //   let curCheckError = errors && errors[htmlFor] && errors[htmlFor].length && errors[htmlFor][0].rule === 'custom' ? true : false;
  //   let nextCheckError = nextErrors && nextErrors[htmlFor] && nextErrors[htmlFor].length && nextErrors[htmlFor][0].rule === 'custom' ? true : false;
  //   if(curCheckError || nextCheckError) return true;
  //   return false;
  // }

  shouldComponentUpdate = (nextProps) => {
    return isEqual(this.props.data, nextProps.data) && isEqual(this.props.errors, nextProps.errors) ? false : true;
  }

  hasErrors = (id) => {
    const { errors } = this.props;
    let retValue = false;
    if (!errors) return retValue;
    try {
      Object.keys(errors).forEach((key) => {
        if (key === id && errors[key] && errors[key].length !== 0) {
          retValue = true;
        }
      });
    }
    catch (e) {
      console.log(e);
    }
    return retValue;
  };

  getError = (id) => {
    const { errors } = this.props;
    let retValue = '';
    if (!errors) return retValue;
    try {
      Object.keys(errors).forEach((key) => {
        if (key === id && errors[key].length !== 0) {
          retValue = errors[key][0]['message'];
        }
      });
    }
    catch (e) {
      console.log(e);
    }
    return retValue;
  };

  
  render() {
    const {
      id,
      classes,
      data,
      type,
      descriptionText,
      helpText: helpT,
      showHelperError,
      Component = TextField,
      labelComponentProps = {},
      title,
      componentProps = {},
      icon,
      columnClass,
      errors,
      liveValidate,
    } = this.props;
    const helpText =
      this.hasErrors(labelComponentProps.htmlFor)
        ? this.getError(labelComponentProps.htmlFor)
        : ' ';
    
    const startAdornment = icon &&
      <InputAdornment position="start">
        <i className={icon + " icons font-2xl d-block mt-1"}></i>
      </InputAdornment>
    
    return (
        <Component
          className={classNames(classes.margin, columnClass)}
          value={(data == undefined || data == null) ? '' : data }
          id={labelComponentProps.htmlFor}
          label={title}
          type={type}
          InputLabelProps={labelComponentProps}
          error={this.hasErrors(labelComponentProps.htmlFor)}
          helperText={helpText}
          {...componentProps}
          InputProps={{
            startAdornment: startAdornment,
            endAdornment: (
              <InputAdornment position="end">
                {descriptionText ? (
                  <Tooltip title={descriptionText} placement="top-start">
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                ) : null}
              </InputAdornment>
            ),
          }}
        />
    );
  }
}
export default withStyles(fieldStyles)(RawConfiguredField);
