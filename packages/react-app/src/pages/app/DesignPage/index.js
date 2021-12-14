import { useState, createRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import {
  ColorPicker,
  BrushSlider,
  ColorSwatches,
  HistoryBox,
} from "@/components/design";
import { Button } from "@/components/elements";

const DesignPage = () => {
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState("#FF0000");
  const [lines, setLines] = useState("");
  const [lineHistory, setLineHistory] = useState([]);
  const [exportImageType, setexportImageType] = useState("png");

  const canvasRef = createRef();

  const canvasProperties = {
    strokeWidth: brushSize,
    strokeColor: brushColor,
    width: 500,
    height: 500,
    canvasColor: "transparent",
  };
  const updateSize = (value) => {
    setBrushSize(value);
  };
  const handleColorChange = (color) => {
    setBrushColor(color.hex8String);
  };

  const handleSwatchChange = (color) => {
    setBrushColor(color);
  };

  const [lineStorage, setLineStorage] = useState({});

  const clearHandler = () => {
    const clearCanvas = canvasRef.current?.clearCanvas;
    if (clearCanvas) {
      clearCanvas();
    }
  };

  const svgExportHandler = async () => {
    const exportSvg = canvasRef.current?.exportSvg;
    if (exportSvg) {
      const exportedDataURI = await exportSvg();
      // setSVG(exportedDataURI);
      console.log(exportedDataURI);
    }
  };

  const imageExportHandler = async () => {
    const exportImage = canvasRef.current?.exportImage;

    if (exportImage) {
      const exportedDataURI = await exportImage(exportImageType);
      // setDataURI(exportedDataURI);
      console.log(exportedDataURI);
    }
  };

  // const blankObject = {
  //   drawMode: true,
  //   strokeColor: "#000000",
  //   strokeWidth: 5,
  //   paths: [{ x: 0, y: 0 }],
  // };
  const switchEye = (id) => {
    console.log("switch eye");
    console.log(id);
    let switchLineHistory = lineHistory;
    let current = lineStorage;
    console.log(switchLineHistory);
    if (!(id in lineStorage)) {
      const removed = switchLineHistory.splice(id, 1);
      current[id] = removed;
      setLineStorage(current);
      setLines(switchLineHistory);
    } else {
      switchLineHistory.splice(id, 0, current[id]);
      delete current[id];
      setLines(switchLineHistory);
      setLineStorage(current);
    }
    canvasRef.current.loadPaths(switchLineHistory);
  };

  const createHistory = () => {
    canvasRef.current
      .exportPaths()
      .then((data) => {
        // console.log(data);
        setLines(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="m-8 flex">
        <div id="drawer" className="border mx-2 w-64 rounded">
          <ColorSwatches
            selectedColor={brushColor}
            selectColor={handleSwatchChange}
          />
          <div className="py-4 px-1">
            <ColorPicker color={brushColor} onColorChange={handleColorChange} />
          </div>
          <BrushSlider updateAttribute={updateSize} />
          <div className="border">
            <div className="grid grid-cols-2 gap-4">
              <Button width="half" onClick={() => {}}>
                UNDO
              </Button>
              <Button width="half" onClick={() => clearHandler()}>
                CLEAR
              </Button>
            </div>
            <div className="m-4">
              <Button
                onClick={() => {
                  svgExportHandler();
                }}
              >
                SAVE TO SVG
              </Button>
            </div>
            <div className="m-4">
              <Button
                onClick={() => {
                  imageExportHandler();
                }}
              >
                SAVE TO IMAGE
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-2">
          <ReactSketchCanvas
            {...canvasProperties}
            ref={canvasRef}
            onChange={createHistory}
          />
        </div>
        <div className="border-2 w-1/3">
          <HistoryBox lineHistory={lines} switchEye={switchEye} />
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
