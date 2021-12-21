const traitTypes = ["all", "eyes", "nose", "ears", "mouth", "hair"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TraitsTab = ({ selectTrait }) => {
  return (
    <div className="border-b border-white-200 dark:border-white-700">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {traitTypes.map((tab, id) => (
          <button
            onClick={() => {
              selectTrait(tab);
            }}
            key={id}
            className={classNames(
              tab.current
                ? ""
                : "border-transparent text-gray-100 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:font-semibold",
              "whitespace-nowrap py-4 px-4 border-b-2 font-medium text-center text-lg uppercase"
            )}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TraitsTab;
