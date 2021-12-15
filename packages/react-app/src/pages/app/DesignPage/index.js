import { useState, createRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import {
  ColorPicker,
  BrushSlider,
  ColorSwatches,
  HistoryBox,
} from "@/components/design";
import { Button } from "@/components/elements";
import {
  RedoIcon,
  UndoIcon,
  BrushIcon,
  EraseIcon,
  UserIcon,
} from "@/components/icons";
import trans_bg_100 from "@/components/backgrounds/transparent-bg-100.png";
import trans_bg_500 from "@/components/backgrounds/transparent-bg-500.png";
import silhouette from "@/components/backgrounds/silhouette.png";

// const trans_bg_500 = require("@/components/backgrounds/transparent-bg-500.png");

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

  const penHandler = () => {
    const eraseMode = canvasRef.current?.eraseMode;
    if (eraseMode) {
      eraseMode(false);
    }
  };
  const eraserHandler = () => {
    const eraseMode = canvasRef.current?.eraseMode;
    if (eraseMode) {
      eraseMode(true);
    }
  };

  const undoHandler = () => {
    const undo = canvasRef.current?.undo;
    if (undo) {
      undo();
    }
  };
  const redoHandler = () => {
    const redo = canvasRef.current?.redo;
    if (redo) {
      redo();
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
    <div className="bg-gray-900">
      <div className="p-8 flex">
        <div id="drawer" className="border mx-2 w-64 rounded bg-white">
          <ColorSwatches
            selectedColor={strokeColor}
            selectColor={handleSwatchChange}
          />
          <div className="py-4 px-1">
            <ColorPicker
              color={strokeColor}
              onColorChange={handleColorChange}
            />
          </div>
          <BrushSlider updateAttribute={handleStrokeWidth} />
          <BrushSlider updateAttribute={handleEraserWidth} />

          <div className="border w-16">
            <div className="grid grid-cols-2 gap-2">
              <Button width="icon" onClick={() => penHandler()}>
                <BrushIcon size="16" />
              </Button>
              <Button width="icon" onClick={() => eraserHandler()}>
                <EraseIcon size="16" />
              </Button>
              <Button width="icon" onClick={() => undoHandler()}>
                <UndoIcon size="16" />
              </Button>
              <Button width="icon" onClick={() => redoHandler()}>
                <RedoIcon size="16" />
              </Button>
            </div>
          </div>

          <div className="border mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Button width="half" onClick={() => clearHandler()}>
                CLEAR
              </Button>
              <Button width="half" onClick={() => resetCanvasHandler()}>
                RESET
              </Button>
            </div>
            <div className="m-4">
              {/* <Button
                onClick={() => {
                  svgExportHandler();
                }}
              >
                SAVE TO SVG
              </Button> */}
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
        <div className="border-2 w-1/3">
          <HistoryBox
            lineHistory={linesVisable}
            switchEye={switchEye}
            deleteRecord={deleteRecord}
          />
        </div>
      </div>
    </div>
  );
};

export default DesignPage;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const BackgroundSelect = (props) => {
  const [background, setBackground] = useState("bg-white");
  const [backgroundImage, setBackgroundImage] = useState(false);
  return (
    <div className="my-4">
      <div className="flex justify-end">
        <div
          className={classNames(
            background === "bg-white" ? " border-blue-500" : "",
            "ml-6 border-2 rounded cursor-pointer h-10 w-10 bg-white"
          )}
          onClick={() => {
            setBackground("bg-white");
            props.background("bg-white");
          }}
        ></div>

        <div
          className={classNames(
            background === "bg-black" ? " border-blue-500" : "border-black",
            "ml-6 border-2 rounded cursor-pointer h-10 w-10 bg-black"
          )}
          onClick={() => {
            setBackground("bg-black");
            props.background("bg-black");
          }}
        ></div>

        <div
          className={classNames(
            background === "transparent" ? " border-blue-500" : "",
            "ml-6 border-2 rounded cursor-pointer h-10 w-10 bg-white"
          )}
          onClick={() => {
            setBackground("transparent");
            props.background("transparent");
          }}
        >
          <div
            className="h-9 w-9 rounded"
            style={{
              background: `url(${trans_bg_100}) no-repeat`,
            }}
          />
        </div>

        <div
          className={classNames(
            backgroundImage ? " border-blue-500" : "",
            "ml-6 border-2 rounded cursor-pointer h-10 w-10 bg-white"
          )}
          onClick={() => {
            setBackgroundImage(!backgroundImage);
            props.backagroundImage(!backgroundImage);
          }}
        >
          <UserIcon size="9" />
        </div>
      </div>
    </div>
  );
};
