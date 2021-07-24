import React from "react";
import classNames from "classnames";
import Button from "@material-ui/core/Button";

export class RawFormButtons extends React.Component {
  shouldComponentUpdate = () => false;

  render() {
    const {
      classes,
      onCancel,
      onSubmit,
      buttonProps,
      hasExternalOnSubmit,
      cancelText = "Cancel",
      submitText = "Submit",
    } = this.props;

    const cancelProps = Object.assign(
      {
        variant: "text",
        onClick: onCancel,
      },
      buttonProps
    );
    const submitProps = Object.assign(
      {
        variant: "contained",
        color: "primary",
        onClick: onSubmit,
      },
      buttonProps
    );
    return (
      (onCancel || onSubmit) && (
        <div className={classes.formButtons}>
          {onCancel && (
            <Button
              className={classNames(classes.cancel, classes.button)}
              {...cancelProps}
            >
              {cancelText}
            </Button>
          )}
          {hasExternalOnSubmit && (
            <Button
              className={classNames(classes.submit, classes.button)}
              {...submitProps}
            >
              {submitText}
            </Button>
          )}
        </div>
      )
    );
  }
}

export default RawFormButtons;
