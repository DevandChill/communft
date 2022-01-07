const TestLayout = () => {
  return (
    <div className="flex h-screen bg-gray-200">
      {/* <div
        className="sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
        className="fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
      >
        <div className="flex items-center justify-center mt-8"></div>

        <nav className="mt-10"></nav>
      </div> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600">
          <div className="flex items-center"></div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <div className="text-4xl my-8">stuff</div>
            <div className="text-4xl my-8">stuff</div>
            <div className="text-4xl my-8">stuff</div>
            <div className="text-4xl my-8">stuff</div>
            <div className="text-4xl my-8">stuff</div>
            <div className="text-4xl my-8">stuff</div>
            <div className="text-4xl my-8">stuff</div>
            <div className="text-4xl my-8">stuff</div>
            <div className="text-4xl my-8">stuff</div>
            <div className="text-4xl my-8">stuff</div>
            <div className="text-4xl my-8">stuff</div>
            <div className="text-4xl my-8">stuff</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TestLayout;
