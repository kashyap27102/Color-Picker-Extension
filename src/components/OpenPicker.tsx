import React, { useEffect, useRef, useState } from "react";

type OpenPickerProps = {
  setShowColorPickerBox: (showColorPickerBox: boolean) => void;
};

const OpenPicker: React.FC<OpenPickerProps> = ({ setShowColorPickerBox }) => {
  const [color, setColor] = useState<string>("#ffffff");
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Create a ref to store the current color
  const colorRef = useRef<string>(color);

  const handleMouseMove = (e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    setPosition({ x, y });

    // Get the element at the cursor position
    const element = document.elementFromPoint(x, y);
    if (element) {
      // Get the background color of the element
      const bgColor = window.getComputedStyle(element).backgroundColor;
      const color = window.getComputedStyle(element).color;

      if (bgColor === "rgba(0, 0, 0, 0)") {
        setColor(color);
        colorRef.current = color; // Update the ref with the new color
        return;
      }
      setColor(bgColor);
      colorRef.current = bgColor;
    }
  };

  const handleClick = () => {
    chrome.runtime.sendMessage({
      type: "COLOR_PICKER_CLICKED",
      color: colorRef.current,
    });
    setShowColorPickerBox(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div>
      {/* Render the color picker */}
      <div
        className="fixed border border-gray-300 rounded-full "
        style={{
          left: position.x + 10, // Offset to avoid covering the cursor
          top: position.y + 10,
          width: "30px",
          height: "30px",
          backgroundColor: color,
          pointerEvents: "none",
          zIndex: 500000, // Allow interactions with elements below
        }}
      />
      <div
        className="flex gap-2 fixed top-0 right-9 p-2 bg-black w-[250px] rounded-sm shadow-lg m-1"
        style={{ zIndex: 5000000 }}
      >
        <div
          style={{ backgroundColor: color }}
          className="rounded-md w-8 h-8 border"
        ></div>
        <div className="text-white text-sm">{color}</div>
      </div>
    </div>
  );
};

export default OpenPicker;
