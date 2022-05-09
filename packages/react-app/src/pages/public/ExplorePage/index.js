import { ExploreCard } from "@/components/explore";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1200, min: 740 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 740, min: 0 },
    items: 1,
  },
};

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

export const ExplorePage = () => {
  return (
    <div>
      <div className="text-center text-3xl text-gray-700 font-bold my-8">
        Explore Collections
      </div>
      <div className="mx-8">
        <Carousel
          responsive={responsive}
          swipeable={true}
          removeArrowOnDeviceType={["mobile", "tablet"]}
          itemClass=" px-8"
        >
          {collections.map((collection) => (
            <div key={collection.id} className="md:w-1/2 lg:w-1/3">
              <ExploreCard collection={collection} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
