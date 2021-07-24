import React from 'react';
import AceEditor from "react-ace";

export default ({ type, value = '', options, nullOption, onChange, label, variant, className, InputLabelProps, helperText, ...rest }) => {
  const onChange = (newValue) => {
    console.log('change', newValue);
  }
  return (
    <div>
      <AceEditor
          mode="javascript"
          theme="monokai"
          onChange={this.onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{
              $blockScrolling: true
          }}
      />
    </div>
  )
};
