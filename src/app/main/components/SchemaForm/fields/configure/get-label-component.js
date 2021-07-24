import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';

export default ({ schema, uiSchema = {} }) => {
  const widget = uiSchema['ui:widget'];
  const { type } = schema;

  if (schema.enum && widget === 'radio') {
    return FormLabel;
  }
  // boolean
  if (type === 'boolean' || widget === 'checkboxes') return null;
  return InputLabel;
};
