import React, { useState } from "react";
import { EyeDropper, useEyeDrop } from "react-eyedrop";

const ColorPickerFromPage = () => {
  const [pickedColor, setPickedColor] = React.useState("#bada55");
  function getColor({ rgb, hex }) {
    setPickedColor(hex);
    console.log(rgb, hex);
  }
  const [color, setColor] = useState({
    rgb: "",
    hex: "yellow",
  });

  console;

  return (
    <div>
      <EyeDropper onChange={getColor} />
      <div
        style={{
          height: 100,
          width: "100%",
          background: color.hex,
          marginBottom: 10,
        }}
      />
      <button>
        <span>Click me</span>
      </button>
    </div>
  );
};

export default ColorPickerFromPage;
