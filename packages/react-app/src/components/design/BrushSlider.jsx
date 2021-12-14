import React, { useState } from "react";

function BrushSlider({ updateAttribute }) {
  const [brushSize, setBrushSize] = useState(3);
  return (
    <div className="flex m-4 justify-center">
      <input
        min="1"
        max="50"
        type="range"
        onChange={(event) => {
          setBrushSize(event.target.value);
          updateAttribute(event.target.value);
        }}
        value={brushSize}
      />
      <div className="bg-white text-lg mx-4">
        <input
          className="bg-white text-lg w-16 px-2 outline-none"
          value={brushSize}
          onChange={(event) => {
            setBrushSize(event.target.value);
            updateAttribute(event.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default BrushSlider;
