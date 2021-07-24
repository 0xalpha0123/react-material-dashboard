import React from 'react';
import classNames from 'classnames';
import keys from 'lodash/keys';
import { withStyles } from '@material-ui/core/styles';
import FormField from '../FormField';
import fieldSetStyles from './field-set-styles';
import Grid from '@material-ui/core/Grid';

export const RawFieldSetObject = ({ className, classes, schema = {}, uiSchema = {}, data = {}, path, ...rest }) => {
  const orientation = (uiSchema['ui:orientation'] === 'row' ? classes.row : null);
  return (
    <div>
      {/* <div className={classNames(classes.root, orientation)} place='pepepe3'> */}
      {/* <Grid container spacing={1} direction="row" alignItems="stretch" place="FieldSetObject"> */}
      {/* <div className='columns is-multiline has-form-columns'> */}
      {keys(schema.properties).map((p) => {
        const newPath = path ? `${path}.${p}` : p;
        return (
          <FormField
            key={p}
            objectData={data}
            path={newPath}
            required={schema.required}
            schema={schema.properties[p]}
            data={data[p]}
            uiSchema={uiSchema[p] || uiSchema || {}}
            {...rest}
          />
        );
      })}
      {/* </div> */}
      {/* </Grid> */}
      {/* </div> */}
    </div>
  );
};
export default withStyles(fieldSetStyles.fieldSetObject)(RawFieldSetObject);
