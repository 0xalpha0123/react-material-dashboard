import React from "react";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
import { generate } from "shortid";
import { withStyles } from "@material-ui/core/styles";
import formStyles from "./form-styles";
import FormField from "./FormField";
import updateFormData, {
  addListItem,
  removeListItem,
  moveListItem,
} from "./helpers/update-form-data";
import getValidationResult from "./helpers/validation";
import DefaultErrorList from "./ErrorList";
import FormButtons from "./FormButtons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      errors: null,
      id: generate(),
    };
    this.formFieldRef = null;
    this.setFormFieldRef = (element) => {
      this.formFieldRef = element;
    };
    this.getIsValid = this.getIsValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showErrors = this.showErrors.bind(this);
    this.addError = this.addError.bind(this);
  }

  static defaultProps = {
    uiSchema: {},
    showErrorList: false,
    showHelperError: true,
    ErrorList: DefaultErrorList,
  };

  componentDidUpdate() {
    toast.dismiss();
  }

  addError = async (field, errorMsg) => {
    let errors = getValidationResult(this.props.schema, this.state.data);
    errors[field].push({ rule: "customerValidation", messagge: errorMsg });
    return errors;
    // WORKAROUND TO SHOW ERRORS FIELDS
    let data = {};
    Object.keys(this.props.schema.properties).forEach((key) => {
      data = updateFormData(data, key, this.state.data[key] || "");
    });
    this.setState({
      data: data,
      errors: errors,
    });
  };

  getIsValid = async () => {
    const { setIsValid } = this.props;
    let isValid = true;
    let errors = getValidationResult(this.props.schema, this.state.data);
    // Check parent validations (if exists)
    try {
      errors = await this.props.validate(this.state.data, errors);
    } catch (e) {
      console.log(e);
    }

    try {
      Object.values(errors).forEach((error) => {
        if (error && error.length !== 0) {
          isValid = false;
        }
      });
    } catch (e) {
      console.log(e);
    }

    setIsValid(isValid);

    // WORKAROUND TO SHOW ERRORS FIELDS
    let properties = this.props.schema.properties;
    if (this.props.schema.type === "complex") {
      let jsonResult = {};
      Object.values(properties).map((item) =>
        Object.keys(item.properties).map(
          (key) =>
            (jsonResult = {
              ...jsonResult,
              [key]: item.properties[key],
            })
        )
      );
      properties = jsonResult;
    }
    let data = {};
    Object.keys(properties).forEach((key) => {
      data = updateFormData(data, key, this.state.data[key] || "");
    });
    this.setState({
      data: data,
      errors: errors,
    });

    return isValid;
  };

  mergeErrors() {
    const { customErrors } = this.props;
    let _errors = this.state.errors;

    if (!customErrors || !Object.keys(customErrors).length) return _errors;

    Object.keys(customErrors).forEach((id) => {
      if (customErrors[id]) _errors[id] = [customErrors[id]];
    });

    return _errors;
  }

  showErrors = () => {
    const { ErrorList } = this.props;
    let errors = getValidationResult(this.props.schema, this.state.data);
    toast.error(<ErrorList errors={errors} field={this.state.id} />);
  };

  componentWillReceiveProps = (nextProps) => {
    // let errors;
    // if (!isEqual(nextProps.schema, this.props.schema)) {
    //   errors = {};
    // } else {
    //   errors = getValidationResult(this.props.schema, nextProps.data);
    // }
    this.setState({
      // errors,
      data: nextProps.data,
    });
  };

  onChange = (field) => (value) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const data = updateFormData(this.state.data, field, value);
    this.setState(
      {
        data: data,
        errors: getValidationResult(this.props.schema, data),
      },
      this.notifyChange
    );
  };

  onMoveItemUp = (path, idx) => () => {
    this.setState(
      (prevState) => ({ data: moveListItem(prevState.data, path, idx, -1) }),
      this.notifyChange
    );
  };

  onMoveItemDown = (path, idx) => () => {
    this.setState(
      (prevState) => ({ data: moveListItem(prevState.data, path, idx, 1) }),
      this.notifyChange
    );
  };

  onDeleteItem = (path, idx) => () => {
    this.setState(
      (prevState) => ({ data: removeListItem(prevState.data, path, idx) }),
      this.notifyChange
    );
  };

  onAddItem = (path, defaultValue) => () => {
    this.setState(
      (prevState) => ({
        data: addListItem(prevState.data, path, defaultValue || ""),
      }),
      this.notifyChange
    );
  };

  onSubmit = async () => {
    const { onSubmit } = this.props;
    const { data } = this.state;
    await onSubmit({ data: data });
  };

  notifyChange = () => {
    const { onChange } = this.props;
    const { data } = this.state;
    if (onChange) {
      onChange({ data: data });
    }
  };

  render() {
    const {
      classes,
      data,
      onSubmit,
      onChange,
      onBlur,
      onFile,
      onCancel,
      cancelText,
      submitText,
      buttonProps,
      showSubmitButton,
      validate,
      ...rest
    } = this.props;

    let mergedErrors = this.mergeErrors();
    const containerStyle = { zIndex: 1999 };
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          style={containerStyle}
          closeButton={false}
        />
        <FormField
          path=""
          data={this.state.data}
          id={this.state.id}
          className={classes.formfield}
          validate={this.validate}
          onChange={this.onChange}
          onBlur={onBlur}
          onFile={onFile}
          onSubmit={this.onSubmit}
          errors={mergedErrors}
          onMoveItemUp={this.onMoveItemUp}
          onMoveItemDown={this.onMoveItemDown}
          onDeleteItem={this.onDeleteItem}
          onAddItem={this.onAddItem}
          ref={this.setFormFieldRef}
          {...rest}
        />
        {showSubmitButton ? (
          <FormButtons
            onSubmit={this.onSubmit}
            hasExternalOnSubmit={!!onSubmit}
            onCancel={onCancel}
            classes={classes}
            cancelText={cancelText}
            submitText={submitText}
            buttonProps={buttonProps}
          />
        ) : null}
      </div>
    );
  }
}
export default withStyles(formStyles)(Form);

Form.propTypes = {
  schema: PropTypes.object.isRequired,
  classes: PropTypes.object,
  uiSchema: PropTypes.object,
  buttonProps: PropTypes.object,
  data: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFile: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  cancelText: PropTypes.string,
  submitText: PropTypes.string,
  showErrorList: PropTypes.bool,
  showHelperError: PropTypes.bool,
  ErrorList: PropTypes.func,
  customErrors: PropTypes.object,
};
