import { useState } from "react";

const CheckList = ({ items, emitSelected }) => {
  const [selected, setSelected] = useState([]);

  const handleCheck = (value) => {
    const currentIndex = selected.indexOf(value);
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(value);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelected(newSelected);
    emitSelected(newSelected);
  };
  return (
    <fieldset className="space-y-5">
      <legend className="sr-only">Items</legend>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items &&
          items.map((item, id) => (
            <div key={id} className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={item}
                  aria-describedby="item-description"
                  name={item}
                  value={item}
                  type="checkbox"
                  onChange={(e) => handleCheck(e.target.value)}
                  className=" h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={item} className="font-medium text-gray-700">
                  {item}
                </label>
              </div>
            </div>
          ))}
      </ul>
    </fieldset>
  );
};

export default CheckList;
