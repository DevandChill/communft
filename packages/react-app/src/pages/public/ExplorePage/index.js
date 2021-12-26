import { Link } from "react-router-dom";
import { ExploreCard } from "@/components/explore";

const collections = [
  {
    id: 1,
    name: "Collection 1",
    description: "Collection 1 description",
    image: "https://picsum.photos/200/300",
    user: {
      id: 1,
      name: "User 1",
    },
  },
  {
    id: 2,
    name: "Collection 2",
    description: "Collection 2 description",
    image: "https://picsum.photos/200/300",
    user: {
      id: 2,
      name: "User 2",
    },
  },
  {
    id: 3,
    name: "Collection 3",
    description: "Collection 3 description",
    image: "https://picsum.photos/200/300",
    user: {
      id: 3,
      name: "User 3",
    },
  },
  {
    id: 4,
    name: "Collection 4",
    description: "Collection 4 description",
    image: "https://picsum.photos/200/300",
    user: {
      id: 4,
      name: "User 4",
    },
  },
];

const ExplorePage = () => {
  return (
    <div>
      <div>
        <div className="text-center text-3xl text-gray-700 font-bold my-8">
          Explore Collections
        </div>
        <div className="p-4 flex flex-wrap">
          {collections.map((collection) => (
            <div key={collection.id} className="md:w-1/2 lg:w-1/3">
              <Link to={`/collection/${collection.id}`}>
                <ExploreCard collection={collection} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
