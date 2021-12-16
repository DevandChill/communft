import { useState, createRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import {
  ColorPicker,
  BrushSlider,
  ColorSwatches,
  HistoryBox,
  BackgroundSelect,
  DraggableBox,
  SideToolbar,
} from "@/components/design";
import { Button } from "@/components/elements";
import trans_bg_500 from "@/components/backgrounds/transparent-bg-500.png";
import silhouette from "@/components/backgrounds/silhouette.png";

const DesignPage = () => {
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [strokeColor, setStrokeColor] = useState("#FF0000");
  const [eraserWidth, setEraserWidth] = useState(5);
  const [linesVisable, setLinesVisable] = useState([]);
  const [linesHistory, setLinesHistory] = useState([]);
  // const [exportImageType, setexportImageType] = useState("png");
  const [exportedImage, setExportedImage] = useState(null);
  const exportImageType = "png";

  const [background, setBackground] = useState("bg-white");
  const [backgroundImage, setBackgroundImage] = useState(false);

  const canvasRef = createRef();

  const canvasProperties = {
    strokeWidth: strokeWidth,
    strokeColor: strokeColor,
    eraserWidth: eraserWidth,
    width: 500,
    height: 500,
    canvasColor: "transparent",
  };
  const handleStrokeWidth = (value) => {
    setStrokeWidth(value);
  };
  const handleEraserWidth = (value) => {
    setEraserWidth(value);
  };
  const handleColorChange = (color) => {
    setStrokeColor(color.hex8String);
  };
  const handleSwatchChange = (color) => {
    setStrokeColor(color);
  };

  const handleSideToolbarSelect = (val) => {
    const eraseMode = canvasRef.current?.eraseMode;
    switch (val) {
      case "brush":
        if (eraseMode) eraseMode(false);
        break;
      case "erase":
        if (eraseMode) eraseMode(true);
        break;
      case "undo":
        const undo = canvasRef.current?.undo;
        if (undo) undo();
        break;
      case "redo":
        const redo = canvasRef.current?.redo;
        if (redo) redo();
        break;
      default:
        break;
    }
  };

  const clearHandler = () => {
    const clearCanvas = canvasRef.current?.clearCanvas;
    if (clearCanvas) {
      clearCanvas();
    }
  };
  const resetCanvasHandler = () => {
    const resetCanvas = canvasRef.current?.resetCanvas;
    if (resetCanvas) {
      resetCanvas();
    }
  };

  // const svgExportHandler = async () => {
  //   const exportSvg = canvasRef.current?.exportSvg;
  //   if (exportSvg) {
  //     const exportedDataURI = await exportSvg();
  //     // setSVG(exportedDataURI);
  //     setExportedImage(exportedDataURI);
  //     // console.log(exportedDataURI);
  //   }
  // };

  const imageExportHandler = async () => {
    const exportImage = canvasRef.current?.exportImage;
    if (exportImage) {
      const exportedDataURI = await exportImage(exportImageType);
      // setDataURI(exportedDataURI);
      setExportedImage(exportedDataURI);
      // console.log(exportedDataURI);
    }
  };

  const switchEye = ({ id, action }) => {
    if (!action) {
      let newLinesVisable = [...linesVisable];
      newLinesVisable[id].strokeWidth = 0;
      setLinesVisable(newLinesVisable);
    } else {
      let newLinesVisable = [...linesVisable];
      newLinesVisable[id].strokeWidth = linesHistory[id].strokeWidth;
      setLinesVisable(newLinesVisable);
    }
  };

  const deleteRecord = (id) => {
    let newLinesHistory = [...linesHistory];
    newLinesHistory.splice(id, 1);
    setLinesHistory(newLinesHistory);
    let newLinesVisable = [...linesVisable];
    newLinesVisable.splice(id, 1);
    setLinesVisable(newLinesVisable);

    canvasRef.current.resetCanvas();
    canvasRef.current.loadPaths(newLinesVisable);
  };

  const createHistory = () => {
    canvasRef.current
      .exportPaths()
      .then((data) => {
        let dataCopy = JSON.parse(JSON.stringify(data));
        setLinesHistory(dataCopy);
        setLinesVisable(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div id="design-container" className="bg-gray-900 h-screen">
      <div>
        <div className="flex">
          <SideToolbar sideToolbarSelect={handleSideToolbarSelect} />

          <div className="pt-8 mx-2">
            <div className="">
              <div style={{ background: `url(${trans_bg_500}) no-repeat` }}>
                <div className={`${background}`} style={{ height: "500px" }}>
                  {backgroundImage ? (
                    <div style={{ background: `url(${silhouette})` }}>
                      <ReactSketchCanvas
                        {...canvasProperties}
                        ref={canvasRef}
                        onChange={createHistory}
                      />
                    </div>
                  ) : (
                    <div>
                      <ReactSketchCanvas
                        {...canvasProperties}
                        ref={canvasRef}
                        onChange={createHistory}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <BackgroundSelect
              backagroundImage={setBackgroundImage}
              background={setBackground}
            />
            <div className="mt-4 border">
              <div style={{ background: `url(${trans_bg_500}) no-repeat` }}>
                <div className={`${background}`} style={{ height: "500px" }}>
                  {backgroundImage ? (
                    <div style={{ background: `url(${silhouette})` }}>
                      {exportedImage && <img src={exportedImage} alt="saved" />}
                    </div>
                  ) : (
                    <div>
                      {exportedImage && <img src={exportedImage} alt="saved" />}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-1 mx-4">
            <DraggableBox
              className="border bg-gray-500"
              width="w-56"
              height="h-80"
              title="history"
            >
              <HistoryBox
                lineHistory={linesVisable}
                switchEye={switchEye}
                deleteRecord={deleteRecord}
              />
            </DraggableBox>
            <DraggableBox
              className="pt-2 border bg-gray-500"
              width="w-56"
              height="h-32"
            >
              <div className="grid grid-cols-2 gap-4">
                <Button width="half" onClick={() => clearHandler()}>
                  CLEAR
                </Button>
                <Button width="half" onClick={() => resetCanvasHandler()}>
                  RESET
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
            </DraggableBox>
          </div>

          <div className="pt-1 mx-4">
            <DraggableBox
              className="pt-2 border bg-gray-500"
              width="w-60"
              height="h-auto"
              title="color picker"
            >
              <ColorPicker
                color={strokeColor}
                onColorChange={handleColorChange}
              />
            </DraggableBox>
            <DraggableBox
              className="pt-2 border bg-gray-500"
              width="w-60"
              height="h-24"
              title="color swatches"
            >
              <ColorSwatches
                selectedColor={strokeColor}
                selectColor={handleSwatchChange}
              />
            </DraggableBox>
            <DraggableBox
              className="pt-2 border bg-gray-500"
              width="w-60"
              height="h-32"
            >
              <BrushSlider updateAttribute={handleStrokeWidth} />
              <BrushSlider updateAttribute={handleEraserWidth} />
            </DraggableBox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
