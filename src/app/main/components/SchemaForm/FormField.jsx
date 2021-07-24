import React from 'react';
import isEqual from 'lodash/isEqual';
import { withStyles } from '@material-ui/core/styles';
import FieldSet from './FieldSet';
import Field from './fields';
import styles from './form-field-styles';

// exported for unit testing
export class RawFormField extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return isEqual(this.props.data, nextProps.data) && isEqual(this.props.errors, nextProps.errors) ? false : true;
  }
  
  render() {
    const { classes, schema, data, uiSchema = {}, onChange, onBlur, onFile, path, ...rest } = this.props;
    const { type } = schema;
    if (type === 'object' || type === 'array' || type === 'complex') {
      return (
        <FieldSet
          className={classes.root}
          path={path}
          schema={schema}
          data={data}
          uiSchema={uiSchema}
          onChange={onChange}
          onBlur={onBlur}
          onFile={onFile}
          {...rest}
        />
      );
    }
    return (
      <Field
        className={classes.root}
        path={path}
        schema={schema}
        data={data}
        uiSchema={uiSchema}
        onChange={onChange && onChange(path)}
        onBlur={onBlur && onBlur(path)}
        onFile={onFile && onFile(path)}
        {...rest}
      />
    );
  }
}

export default withStyles(styles)(RawFormField);
