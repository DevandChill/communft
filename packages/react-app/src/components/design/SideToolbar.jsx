import { useState } from "react";
import { RedoIcon, UndoIcon, BrushIcon, EraseIcon } from "@/components/icons";

const SideToolbar = ({ sideToolbarSelect }) => {
  const [activeTool, setActiveTool] = useState("brush");
  return (
    <div className="pt-1 w-10 h-screen bg-gray-500 ">
      <Button2
        onClick={() => {
          sideToolbarSelect("brush");
          setActiveTool("brush");
        }}
        active={activeTool === "brush"}
      >
        <BrushIcon size="16" />
      </Button2>
      <Button2
        onClick={() => {
          sideToolbarSelect("erase");
          setActiveTool("erase");
        }}
        active={activeTool === "erase"}
      >
        <EraseIcon size="16" />
      </Button2>
      <Button2 onClick={() => sideToolbarSelect("undo")}>
        <UndoIcon size="16" />
      </Button2>
      <Button2 onClick={() => sideToolbarSelect("redo")}>
        <RedoIcon size="16" />
      </Button2>
    </div>
  );
};

export default SideToolbar;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Button2 = ({ children, onClick, active }) => {
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
