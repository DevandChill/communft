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
    <div className="w-full bg-white">
      <div className="font-semibold text-gray-900 text-xl my-2">History</div>
      <div className="">
        {lineHistory &&
          lineHistory.map((line, id) => (
            <div key={id} className="grid grid-cols-4 gap-2 border py-2">
              <div className="px-2 py-1 w-24 text-gray-800 font-semibold">
                {line.drawMode ? (
                  <BrushIcon size="20" />
                ) : (
                  <EraseIcon size="20" />
                )}
              </div>
              <div className="px-2">
                {line.drawMode ? (
                  <div
                    className="p-2 w-16 h-7 rounded"
                    style={{
                      backgroundColor: `${line.strokeColor}`,
                    }}
                  ></div>
                ) : (
                  <div className="p-2 w-16 h-7 rounded"></div>
                )}
              </div>
              <div className="px-2">
                {line.strokeWidth > 0 ? (
                  <button
                    className="px-2 py-1 focus:outline-none"
                    onClick={() => handleEye({ id, action: false })}
                  >
                    <EyeOnIcon size="5" />
                  </button>
                ) : (
                  <button
                    className="px-2 py-1 focus:outline-none"
                    onClick={() => handleEye({ id, action: true })}
                  >
                    <EyeOffIcon size="5" />
                  </button>
                )}
              </div>
              <div className="px-2">
                <button
                  className="px-2 py-1 focus:outline-none"
                  onClick={() => handleDelete(id)}
                >
                  <TrashIcon size="5" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HistoryBox;
