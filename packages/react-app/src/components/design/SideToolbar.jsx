import { useState } from "react";
import {
  RedoIcon,
  UndoIcon,
  BrushIcon,
  EraseIcon,
  ColorIcon,
  HistoryIcon,
  PaletteIcon,
  SaveIcon,
  SliderIcon,
} from "@/components/icons";

const SideToolbar = ({ sideToolbarSelect, sideToolbarWidget }) => {
  const [activeTool, setActiveTool] = useState("brush");
  const [activeColorPicker, setActiveColorPicker] = useState(true);
  const [activePallete, setActivePallete] = useState(true);
  const [activeSlider, setActiveSlider] = useState(true);
  const [activeHistory, setActiveHistory] = useState(true);
  const [activeSave, setActiveSave] = useState(true);

  return (
    <div className="pt-1 w-10 h-screen bg-gray-500 fixed z-50">
      <div>
        <Button
          onClick={() => {
            sideToolbarSelect("brush");
            setActiveTool("brush");
          }}
          active={activeTool === "brush"}
        >
          <BrushIcon size="16" />
        </Button>
        <Button
          onClick={() => {
            sideToolbarSelect("erase");
            setActiveTool("erase");
          }}
          active={activeTool === "erase"}
        >
          <EraseIcon size="16" />
        </Button>
      </div>
      <div className="mt-8">
        <Button onClick={() => sideToolbarSelect("undo")}>
          <UndoIcon size="16" />
        </Button>
        <Button onClick={() => sideToolbarSelect("redo")}>
          <RedoIcon size="16" />
        </Button>
      </div>
      <div className="mt-24">
        <Button
          onClick={() => {
            sideToolbarWidget("colorPicker");
            setActiveColorPicker(!activeColorPicker);
          }}
          active={activeColorPicker}
        >
          <ColorIcon size="16" />
        </Button>
        <Button
          onClick={() => {
            sideToolbarWidget("colorSwatches");
            setActivePallete(!activePallete);
          }}
          active={activePallete}
        >
          <PaletteIcon size="16" />
        </Button>
        <Button
          onClick={() => {
            sideToolbarWidget("brushSlider");
            setActiveSlider(!activeSlider);
          }}
          active={activeSlider}
        >
          <SliderIcon size="16" />
        </Button>
        <Button
          onClick={() => {
            sideToolbarWidget("historyBox");
            setActiveHistory(!activeHistory);
          }}
          active={activeHistory}
        >
          <HistoryIcon size="16" />
        </Button>
        <Button
          onClick={() => {
            sideToolbarWidget("saveBox");
            setActiveSave(!activeSave);
          }}
          active={activeSave}
        >
          <SaveIcon size="16" />
        </Button>
      </div>
    </div>
  );
};

export default SideToolbar;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Button = ({ children, onClick, active }) => {
  return (
    <button
      className={classNames(
        active ? "bg-gray-700" : "",
        "mb-1 py-2 relative justify-center inline-flex items-center w-full hover:bg-gray-700 text-white"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
