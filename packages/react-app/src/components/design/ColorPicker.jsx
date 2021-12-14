import React from "react";
import iro from "@jaames/iro";

class ColorPicker extends React.Component {
  componentDidMount() {
    const { props } = this;
    // create a new iro color picker and pass component props to it
    this.colorPicker = new iro.ColorPicker(this.el, {
      width: 250,
      color: props.color,
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
            sliderType: "alpha",
          },
        },
      ],
    });

    // call onColorChange prop whenever the color changes
    this.colorPicker.on("color:change", (color) => {
      if (props.onColorChange) props.onColorChange(color);
    });
  }

  componentDidUpdate() {
    // isolate color from the rest of the props
    const { color, ...colorPickerState } = this.props;
    // update color
    if (color) this.colorPicker.color.set(color);
    // push rest of the component props to the colorPicker's state
    this.colorPicker.setState(colorPickerState);
  }

  render() {
    return (
      <div>
        <div ref={(el) => (this.el = el)} />
      </div>
    );
  }
}
export default ColorPicker;
