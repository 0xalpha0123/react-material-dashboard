import React from 'react';
// import IconButton from '@material-ui/core/IconButton';
// import ArrowUpward from '@material-ui/icons/ArrowUpward';
// import ArrowDownward from '@material-ui/icons/ArrowDownward';
import {
  Fab,
  Button,
  IconButton
}from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import fieldSetStyles from './field-set-styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    marginTop: 100,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  btnIcon: {
    padding: '12px!important',
    marginTop: 10
  }
}));

export const RawReorderControls = ({ first, last, classes, onMoveItemUp, onMoveItemDown, onDeleteItem }) => {
  const classesCtrl = useStyles();
  return (
    <div className={classesCtrl.root}>
      {/* <IconButton className={classes.up} onClick={onMoveItemUp} disabled={first}><ArrowUpward /></IconButton>
      <IconButton className={classes.down} onClick={onMoveItemDown} disabled={last}><ArrowDownward /></IconButton>
      <IconButton className={classes.remove} onClick={onDeleteItem} ><RemoveCircle /></IconButton> */}
      <IconButton onClick={onDeleteItem} color="primary" aria-label="add" className={classesCtrl.btnIcon}><ClearIcon /></IconButton>
      {/* <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={onDeleteItem}
      >
        <ClearIcon />
      </Button> */}
      {/* <Fab size="small" color="primary" aria-label="add" onClick={onDeleteItem}>
        <ClearIcon />
      </Fab> */}
    </div>
  )
};
export default withStyles(fieldSetStyles.reorderControls)(RawReorderControls);
