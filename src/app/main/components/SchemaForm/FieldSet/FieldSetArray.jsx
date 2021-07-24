import React from 'react';
import includes from 'lodash/includes';
import slice from 'lodash/slice';
// import IconButton from '@material-ui/core/IconButton';
// import AddCircle from '@material-ui/icons/AddCircle';
import {
  Fab,
  Button
}from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import isArray from 'lodash/isArray';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import FormField from '../FormField';
import fieldSetStyles from './field-set-styles';
import getDefaultValue from '../helpers/get-default-value';
import ReorderableFormField from './ReorderableFormField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export const RawFieldSetArray = (props) => {
  const classesCtrl = useStyles();

  const {
    startIdx = 0, className, classes,
    schema = {}, uiSchema = {}, data, path, onMoveItemUp, onMoveItemDown, onDeleteItem, ...rest
  } = props;

  return (
    <div className={classes.root}>
      {!isArray(schema.items) && !schema.uniqueItems && (
        <div>
          {(data || []).map((d, idx) => (
            <ReorderableFormField
              key={`${path}[${idx}]` // eslint-disable-line react/no-array-index-key
              }
              path={`${path}[${startIdx + idx}]`}
              required={schema.required}
              schema={schema.items}
              data={d}
              onMoveItemUp={onMoveItemUp && onMoveItemUp(path, startIdx + idx)}
              onMoveItemDown={onMoveItemDown && onMoveItemDown(path, startIdx + idx)}
              onDeleteItem={onDeleteItem && onDeleteItem(path, startIdx + idx)}
              uiSchema={uiSchema.items}
              first={idx === 0}
              last={idx === data.length - 1}
              {...rest}
            />
          ))}
          {/* <div className={classes.addItemBtn}> */}
          <div className={classesCtrl.root}>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={rest.onAddItem && rest.onAddItem(path, getDefaultValue(schema.items))}
            >
              <AddIcon />
            </Button>
            {/* <Fab size="small" color="secondary" aria-label="add" onClick={rest.onAddItem && rest.onAddItem(path, getDefaultValue(schema.items))}>
              <AddIcon />
            </Fab> */}
          </div>
          {/* </div> */}
        </div>
      )}
      {isArray(schema.items) && (data || []).map((d, idx) => {
        if (idx < schema.items.length) {
          return (
            <FormField
              key={`${path}[${idx}]` // eslint-disable-line react/no-array-index-key
              }
              path={`${path}[${startIdx + idx}]`}
              required={schema.required}
              schema={schema.items[idx]}
              data={d}
              uiSchema={(uiSchema.items || [])[idx]}
              {...rest}
            />
          );
        }
        return null;
      })}
      {(!isArray(schema.items) && schema.uniqueItems && schema.items.enum) && schema.items.enum.map(d => (
        <FormField
          key={`${path}[${d}]` // eslint-disable-line react/no-array-index-key
          }
          path={`${path}`}
          required={schema.required}
          schema={{ ...schema.items, title: d }}
          data={includes(data, d)}
          uiSchema={uiSchema}
          {...rest}
        />
      ))}
      {schema.additionalItems
        && (
          <RawFieldSetArray
            classes={classes}
            path={path}
            startIdx={2}
            required={schema.required}
            schema={{ type: 'array', items: schema.additionalItems }}
            data={slice(data, schema.items.length)}
            uiSchema={uiSchema.additionalItems}
            onMoveItemUp={onMoveItemUp}
            onMoveItemDown={onMoveItemDown}
            onDeleteItem={onDeleteItem}
            {...rest}
          />
        )
      }
    </div>
  );
};
export default withStyles(fieldSetStyles.fieldSetArray)(RawFieldSetArray);
