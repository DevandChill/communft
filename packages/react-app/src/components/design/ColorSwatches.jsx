const ColorSwatches = ({ selectColor, selectedColor }) => {
  const colors = [
    "#000000",
    "#FF0000",
    "#E62993",
    "#8F3FB5",
    "#004CFF",
    "#3FA1B5",
    "#42B836",
    "#FFFFFF",
  ];

  const handleColorPick = (color) => {
    selectColor(color);
  };
  return (
    <div>
      <div>
        {colors.map((color, id) => {
          let baseColor = { backgroundColor: color };
          if (color.toLowerCase() === selectedColor.toLowerCase()) {
            baseColor.border = "2px solid blue";
            baseColor.borderRadius = "1px";
          }
          return (
            <button
              className="w-6 h-6 border"
              key={id}
              style={baseColor}
              onClick={() => {
                handleColorPick(color);
              }}
            ></button>
          );
        })}
      </div>
      <div></div>
    </div>
  );
};

export default ColorSwatches;
