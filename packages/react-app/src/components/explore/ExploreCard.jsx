import { useNavigate } from "react-router-dom";

const ExploreCard = ({ collection }) => {
  let navigate = useNavigate();
  const handleSelectCollection = (collectionId) => {
    navigate(`/collection/${collectionId}`);
  };
  const handleSelectUser = (userId) => {
    navigate(`/user/${userId}`);
  };
  return (
    <div className="my-4 border-2 border-gray-800 bg-gray-700 transition-shadow shadow-xl w-80 mx-auto rounded-lg hover:shadow-2xl transform hover:scale-105 duration-700 cursor-pointer">
      <div
        onClick={() => handleSelectCollection(collection.id)}
        className="justify-center items-center"
      >
        <img
          src="https://image.freepik.com/free-vector/abstract-binary-code-techno-background_1048-12836.jpg"
          className="h-48 w-80"
          alt=""
        />
      </div>

      <div className="flex items-center p-4">
        <div className="relative flex flex-col items-center w-full">
          <div
            onClick={() => handleSelectCollection(collection.id)}
            className="h-24 w-24 md rounded-full relative avatar flex items-end justify-end text-purple-400 min-w-max  -top-16  bg-purple-200  row-start-1 row-end-3 text-purple-650 ring-2 ring-white"
          >
            <img
              className="h-24 w-24 md rounded-full relative"
              src="https://avatars3.githubusercontent.com/u/11801238?v=4"
              alt=""
            />
          </div>
          <div className="space-y-1 text-center -mt-12 w-full">
            <div
              onClick={() => handleSelectCollection(collection.id)}
              className="text-md whitespace-nowrap text-gray-50 font-semibold"
            >
              {collection.name}
            </div>
            <div
              onClick={() => handleSelectUser(collection.user.id)}
              className="text-center text-md whitespace-nowrap text-gray-100"
            >
              by
              <span className="hover:text-purple-400 pl-2">
                {collection.user.name}
              </span>
            </div>
            <p
              onClick={() => handleSelectCollection(collection.id)}
              className="text-sm text-gray-200 py-4"
            >
              {collection.description}
            </p>

            <div
              onClick={() => handleSelectCollection(collection.id)}
              className="py-4 flex justify-center items-center w-full divide-x divide-gray-400 divide-solid"
            >
              <span className="text-center px-2">
                <span className="font-bold text-gray-50">56</span>
                <span className="text-gray-100"> favorited</span>
              </span>
              <span className="text-center px-2">
                <span className="font-bold text-gray-50">12</span>
                <span className="text-gray-100"> traits</span>
              </span>
              <span className="text-center px-2">
                <span className="font-bold text-gray-50">27</span>
                <span className="text-gray-100"> contributors</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;
