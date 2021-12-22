import { useState } from "react";
// import TraitCard from "./TraitCard";
// import TraitsTab from "./TraitsTab";
import {
  CollectionHeader,
  TraitsTab,
  TraitCard,
} from "@/components/collection";

const traits = [
  {
    id: 1,
    title: "something 1",
    img_url: "https://flowbite.com/docs/images/blog/image-1.jpg",
    collectionId: "1",
    user_id: 12345,
    user_img_url: "https://flowbite.com/docs/images/blog/image-1.jpg",
    type: "eyes",
    votes: 34,
  },
  {
    id: 2,
    title: "something 2",
    collectionId: "1",
    img_url: "https://flowbite.com/docs/images/blog/image-1.jpg",
    type: "mouth",
    votes: 3,
  },
  {
    id: 3,
    title: "something 3",
    collectionId: "1",
    img_url: "https://flowbite.com/docs/images/blog/image-1.jpg",
    type: "eyes",
    votes: 7,
  },
  {
    id: 4,
    title: "something 4",
    collectionId: "1",
    img_url: "https://flowbite.com/docs/images/blog/image-1.jpg",
    type: "nose",
    votes: 9,
  },
  {
    id: 5,
    title: "something 5",
    collectionId: "1",
    img_url: "https://flowbite.com/docs/images/blog/image-1.jpg",
    type: "nose",
    votes: 11,
  },
  {
    id: 6,
    title: "something 6",
    collectionId: "1",
    img_url: "https://flowbite.com/docs/images/blog/image-1.jpg",
    type: "ears",
    votes: 11,
  },
  {
    id: 7,
    title: "something 6",
    collectionId: "1",
    img_url: "https://flowbite.com/docs/images/blog/image-1.jpg",
    type: "hair",
    votes: 15,
  },
];

const CollectionPage = () => {
  const [traitFilter, setTraitFilter] = useState("");
  const handleSelectTrait = (trait) => {
    if (trait === "all") {
      setTraitFilter("");
    } else setTraitFilter(trait);
  };
  return (
    <div className="flex-col justify-center h-full bg-gray-500">
      <div>
        <CollectionHeader />
      </div>
      <div className="flex justify-center pb-4">
        <TraitsTab selectTrait={handleSelectTrait} />
      </div>

      <div className="p-4 flex flex-wrap">
        {traits.map((trait, id) => {
          const show_filter_boolean =
            traitFilter === trait.type || traitFilter === "";
          if (show_filter_boolean)
            return (
              <div key={id} className="md:w-1/2 lg:w-1/3">
                <TraitCard trait={trait} />
              </div>
            );
          else return null;
        })}
      </div>
    </div>
  );
};

export default CollectionPage;
