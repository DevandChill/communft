import { useEffect, useState } from "react";
import {
  TrashIcon,
  EyeOffIcon,
  EyeOnIcon,
  BrushIcon,
  EraseIcon,
} from "@/components/icons";

const HistoryBox = (props) => {
  const [lineHistory, setLineHistory] = useState([]);

  const handleEye = (id) => {
    props.switchEye(id);
  };

  const handleDelete = (id) => {
    props.deleteRecord(id);
  };

  useEffect(() => {
    setLineHistory(props.lineHistory);
  }, [props.lineHistory]);

  return (
    <div className="w-56 bg-gray-200">
      <div className="">
        {lineHistory &&
          lineHistory.map((line, id) => (
            <div
              key={id}
              className="flex w-56 border border-gray-400 shadow py-2 text-gray-800 font-semibold"
            >
              <div className="w-6"></div>
              <div className="w-12 px-2 py-1">
                {line.drawMode ? (
                  <BrushIcon size="20" />
                ) : (
                  <EraseIcon size="20" />
                )}
              </div>
              <div className="w-20 px-2">
                {line.drawMode ? (
                  <div
                    className="w-12 h-7 rounded"
                    style={{
                      backgroundColor: `${line.strokeColor}`,
                    }}
                  ></div>
                ) : (
                  <div className="w-12 h-7 rounded"></div>
                )}
              </div>
              <div className="w-24 flex text-gray-700">
                <div className="mx-2">
                  {line.strokeWidth > 0 ? (
                    <button
                      className="py-1 focus:outline-none"
                      onClick={() => handleEye({ id, action: false })}
                    >
                      <EyeOnIcon size="5" />
                    </button>
                  ) : (
                    <button
                      className="py-1 focus:outline-none"
                      onClick={() => handleEye({ id, action: true })}
                    >
                      <EyeOffIcon size="5" />
                    </button>
                  )}
                </div>
                <div className="mx-2">
                  <button
                    className="py-1 focus:outline-none"
                    onClick={() => handleDelete(id)}
                  >
                    <TrashIcon size="5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HistoryBox;
