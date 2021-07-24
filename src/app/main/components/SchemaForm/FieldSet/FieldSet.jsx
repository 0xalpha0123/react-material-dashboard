import React from 'react';
import classNames from 'classnames';
import endsWith from 'lodash/endsWith';
import isEqual from 'lodash/isEqual';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import fieldSetStyles from './field-set-styles';
import FieldSetArray from './FieldSetArray';
import FieldSetObject from './FieldSetObject';
import values from 'lodash/values';
import { Col, Row } from 'reactstrap';

export const RawFieldSetContent = (props) => {
  const { schema = {}, uiSchema = {} } = props;
  const { type } = schema;
  if (type === 'array') {
    return <FieldSetArray {...props} />;
  }
  if (type === 'object') {
    return <FieldSetObject {...props} />;
  }
  if (type === 'complex') {
    let cols = Object.keys(schema.properties).length;
    let colsize = Math.trunc(12 / cols);
    return  <Row> 
      {values(schema.properties).map((value) => {
        const {schema, uiSchema, ...rest} = props;
        return <Col xs={12} sm={colsize}><RawFieldSet schema={value} uiSchema={uiSchema} {...rest}/><p>&nbsp;</p></Col>
    })}
    </Row> 
  }
  return null;
};

export const FieldSetContent = withStyles(fieldSetStyles.fieldSetContent)(RawFieldSetContent);

// for unit testing
export class RawFieldSet extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return isEqual(this.props.data, nextProps.data) && isEqual(this.props.errors, nextProps.errors) ? false : true;
  }

  render() {
    const { className, path, classes, schema = {} } = this.props;
    return (
      <fieldset className={classNames(className, classes.root, { [classes.listItem]: endsWith(path, ']') })}>
        {schema.title
          && <InputLabel>{schema.title}</InputLabel>
        }
        <FieldSetContent path={path} {...this.props} />
      </fieldset>
    );
  }
}

export default withStyles(fieldSetStyles.fieldSet)(RawFieldSet);
