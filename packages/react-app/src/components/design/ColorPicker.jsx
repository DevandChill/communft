import { useEffect, useRef } from "react";
import iro from "@jaames/iro";

const ColorPickerComponent = ({ color, onChange }) => {
  const ref = useRef();
  const colorPicker = useRef();
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (!colorPicker.current) {
      const cp = (colorPicker.current = new iro.ColorPicker(ref.current, {
        color: color,
        width: 220,
        layout: [
          {
            component: iro.ui.Wheel,
            options: {},
          },
          {
            component: iro.ui.Slider,
            options: {
              sliderType: "hue",
            },
          },
          {
            component: iro.ui.Slider,
            options: {
              sliderType: "saturation",
            },
          },
          {
            component: iro.ui.Slider,
            options: {
              sliderType: "value",
            },
          },
          {
            component: iro.ui.Slider,
            options: {
              sliderType: "alpha",
            },
          },
        ],
      }));
      cp.on("color:change", (color) => onChange(color));
    } else if (color !== colorPicker.current.color.hexString) {
      colorPicker.current.color.set(color);
    }
  }, [color, onChange]);
  return <div ref={ref} />;
};
const ColorPicker = ({ color, onColorChange }) => {
  return (
    <div>
      <ColorPickerComponent color={color} onChange={onColorChange} />
      <div className="py-2 font-bold text-gray-800 text-center">{color}</div>
    </div>
  );
};
export default ColorPicker;
