// import Input, { InputLabel } from 'material-ui/Input'; // eslint-disable-line import/no-named-default
import getComponentProps from './get-component-props';
import getLabelComponentProps from './get-label-component-props';
import getLabelComponent from './get-label-component';
import getComponent from './get-component';
import classNames from 'classnames';

const getClassName = ({ uiSchema = {} }) => {
  const widget = uiSchema['ui:widget'];
  return widget === 'textarea' ? 'textarea' : null;
};

export default (props) => {
  const { schema, uiSchema = {} } = props;
  const title = uiSchema['ui:title'] || schema.title;
  const icon = schema.icon;
  // const columnClass = classNames('column', uiSchema['ui:column'] || 'is-12');
  const columnClass = uiSchema['ui:column'] || 'fullWidth';
  return {
    title,
    className: getClassName(props),
    Component: getComponent(props),
    componentProps: getComponentProps(props),
    LabelComponent: title && getLabelComponent(props),
    labelComponentProps: getLabelComponentProps(props),
    popUpOffset: props.popUpOffset,
    icon,
    columnClass
  };
};
