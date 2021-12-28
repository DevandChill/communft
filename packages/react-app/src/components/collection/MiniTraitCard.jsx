import { useState, useEffect } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MiniTraitCard = ({ trait, selectTrait, currentSelected }) => {
  const [active, setActive] = useState(false);
  const setActivity = (activity) => {
    setActive(activity);
    selectTrait(trait);
  };

  useEffect(() => {
    if (currentSelected.id !== trait.id) setActive(false);
  }, [currentSelected, trait]);

  return (
    <div className="mx-4 cursor-pointer" onClick={() => setActivity(!active)}>
      <div
        className={classNames(
          active
            ? "border-4 border-blue-500 rounded-lg mb-5"
            : "bg-white shadow-lg hover:shadow-2xl border border-gray-400 hover:border-gray-500 rounded-lg mb-5",
          ""
        )}
      >
        <img className="rounded-lg" src={trait.img_url} alt=""></img>
      </div>
    </div>
  );
};

export default MiniTraitCard;
