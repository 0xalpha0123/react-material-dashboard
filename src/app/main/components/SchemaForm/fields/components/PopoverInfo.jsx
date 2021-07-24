import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import debounce from 'lodash/debounce';

const getLTofEl = el => {
  const box = el.getBoundingClientRect();
  return {
    top: box.top,
    left: box.left
  };
};

class PopoverInfo extends React.Component {
  state = {
    anchorEl: null
  };

  handlePopoverOpen = debounce(
    event => {
      this.setState({ anchorEl: event.currentTarget });
    },
    250,
    { leading: true }
  );

  handlePopoverClose = debounce(
    () => {
      this.setState({ anchorEl: null });
    },
    250,
    { leading: true }
  );

  getAnchorPosition = () => {
    const { anchorEl } = this.state;
    const { popUpOffset } = this.props;
    if (!anchorEl) {
      return { top: 0, left: 0 };
    }
    const pos = getLTofEl(anchorEl);
    if (popUpOffset) {
      if (popUpOffset.top) pos.top += popUpOffset.top;
      if (popUpOffset.left) pos.left += popUpOffset.left;
    }
    return pos;
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { descriptionText, classes = {} } = this.props;
    return (
      <IconButton
        aria-owns={open ? 'mouse-over-popover' : null}
        aria-haspopup="true"
        disableRipple
        className={classes.infoButton}
        disableTouchRipple
        onMouseEnter={this.handlePopoverOpen}
        onMouseLeave={this.handlePopoverClose}
      >
        <InfoIcon />
        <Popover
          anchorReference="anchorPosition"
          id="mouse-over-popover"
          className={classes.infoPopover}
          classes={{
            paper: classes.infoPaper
          }}
          style={{ pointerEvents: 'none' }}
          open={open}
          anchorEl={anchorEl}
          anchorPosition={this.getAnchorPosition()}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>{descriptionText}</Typography>
        </Popover>
      </IconButton>
    );
  }
}
export default PopoverInfo;
