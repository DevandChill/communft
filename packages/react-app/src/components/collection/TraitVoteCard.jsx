const TraitVoteCard = ({ selectedTraits, lastSelectedTrait }) => {
  return (
    <div className="mx-4">
      <div className="bg-white shadow-lg hover:shadow-2xl border border-gray-400 hover:border-gray-500 rounded-lg mb-5">
        <img
          className="rounded-t-lg"
          src={lastSelectedTrait ? lastSelectedTrait.img_url : ""}
          alt=""
        ></img>
      </div>
      <div className="p-5 justify-left items-start">
        <h5 className="text-left text-gray-900 font-bold text-2xl tracking-tight mb-2">
          {lastSelectedTrait ? "All of the traits" : "Please select a trait"}
        </h5>
        <div className="flex justify-between content-center">
          <div className="flex justify-between text-center align-middle">
            <img
              className="w-12 h-12 rounded-full mx-auto"
              src="https://flowbite.com/docs/images/blog/image-1.jpg"
              alt=""
              width="100"
              height="100"
            ></img>
            <div className="flex pl-4 my-auto text-center align-middle text-gray-800 font-semibold">
              {lastSelectedTrait ? lastSelectedTrait.user : "mrno.eth"}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">
              Upvote {lastSelectedTrait ? lastSelectedTrait.votes : 0}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraitVoteCard;
