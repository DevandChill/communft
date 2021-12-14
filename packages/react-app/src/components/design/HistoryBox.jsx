const HistoryBox = (props) => {
  let lineHistory = props.lineHistory;
  // console.log(lineHistory);
  // setLineStorage(convert(props.lineHistory.lines))

  const handleEye = (id) => {
    props.switchEye(id);
    console.log("handle Eye");
    console.log(id);
  };

  const handleDelete = (id) => {
    props.switchEye(id);
    console.log("handle delete");
    console.log(id);
  };

  return (
    <div className="w-full">
      <div className="font-semibold text-gray-900 text-xl my-2">History</div>
      <div className="">
        {lineHistory &&
          lineHistory.map((line, id) => (
            <div key={id} className="grid grid-cols-4 gap-2 border py-2">
              <div className="px-2 py-1 w-24 text-gray-800 font-semibold">
                {line.paths.length} - p
              </div>
              <div className="px-2">
                <div
                  className="p-2 w-16 h-8 rounded"
                  style={{
                    backgroundColor: `${line.strokeColor}`,
                  }}
                ></div>
              </div>
              <div className="px-2">
                <button
                  className="px-2 py-1 focus:outline-none"
                  onClick={() => handleEye(id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
              <div className="px-2">
                <button
                  className="px-2 py-1 focus:outline-none"
                  onClick={() => handleDelete(id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HistoryBox;
