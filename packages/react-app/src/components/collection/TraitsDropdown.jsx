const traitTypes = ["all", "eyes", "nose", "ears", "mouth", "hair"];

const TraitsDropdown = ({ selectTrait }) => {
  const handleChage = (event) => {
    selectTrait(event.target.value);
  };
  return (
    <div className="mx-8">
      <div className="my-4">
        <label htmlFor="traits" className="text-xl font-bold text-gray-700">
          Select Trait
        </label>
        <select
          id="traits"
          name="traits"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg rounded-md"
          defaultValue="all"
          onChange={handleChage}
        >
          {traitTypes.map((tab, id) => (
            <option key={id} value={tab}>
              {tab}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TraitsDropdown;
