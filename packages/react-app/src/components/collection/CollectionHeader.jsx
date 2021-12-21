const CollectionHeader = () => {
  return (
    <div className="mb-24 flex flex-col content-center items-center shadow-2xl bg-gray-900">
      <div className="flex-none w-32 h-32 relative rounded-full mx-auto mt-20">
        <img
          src="https://flowbite.com/docs/images/blog/image-1.jpg"
          alt=""
          className="inset-0 w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="py-4 text-gray-200 text-3xl font-bold">
        Collection Name
      </div>
      <div className="-m-16 mt-8 justify-between lg:max-w-full s:w-2/3 rounded-lg bg-white shadow-lg">
        <div className="flex justify-between space-x-4 text-center ">
          <div className="rounded-xl p-10 text-gray-800 font-semibold">
            <h3>8.7K</h3>
            <span>Total Present</span>
          </div>
          <div className="rounded-xl p-10 text-gray-800 font-semibold">
            <h3>99</h3>
            <span>Registrations</span>
          </div>
          <div className=" rounded-xl p-10 text-gray-800 font-semibold">
            <h3>30</h3>
            <span>Totals Session</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionHeader;
