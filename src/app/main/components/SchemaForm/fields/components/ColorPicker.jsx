import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import PropTypes from 'prop-types';

const ColorPicker = (props) => {
  const { name, background } = props
  const [displayColorPicker, setDisplayColorPicker] = useState();
  const [colorValue, setColorValue] = useState("#ddd");

  const handlePickClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  };

  const handleColorChange = color => {
    setColorValue(color.hex)
  };

  return (
    <div className="color-picker" style={{ display: "flex" }}>
      <div>{name} </div>
      <span onClick={handlePickClick}><i style={{ cursor: "pointer", fontSize: "30px", color: `${colorValue}` }} className="cil-color-palette"></i></span>
      <div style={{ maxHeight: "30px", zIndex: "1500" }}>
        {displayColorPicker && (
          <div className="color-picker__popover">
            <SketchPicker
              color={colorValue}
              onChange={handleColorChange}
            />
            <div onClick={handlePickClick}>APPLY</div>
          </div>
        )}
      </div>
    </div>
  );
}

ColorPicker.propTypes = {
  name: PropTypes.string
};

ColorPicker.defaultProps = {
  name: 'Color Picker'
};

export default ColorPicker;
