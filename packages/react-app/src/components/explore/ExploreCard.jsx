import { Link } from "react-router-dom";

const ExploreCard = ({ collection }) => {
  return (
    <div class="my-4 border-2 border-gray-800 bg-gray-700 transition-shadow shadow-xl w-80 mx-auto rounded-lg hover:shadow-2xl transform hover:scale-105 duration-700 cursor-pointer">
      <div class="justify-center items-center">
        <img
          src="https://image.freepik.com/free-vector/abstract-binary-code-techno-background_1048-12836.jpg"
          class="h-48 w-80"
          alt=""
        />
      </div>

      <div class="flex items-center p-4">
        <div class="relative flex flex-col items-center w-full">
          <div class="h-24 w-24 md rounded-full relative avatar flex items-end justify-end text-purple-400 min-w-max  -top-16  bg-purple-200  row-start-1 row-end-3 text-purple-650 ring-2 ring-white">
            <img
              class="h-24 w-24 md rounded-full relative"
              src="https://avatars3.githubusercontent.com/u/11801238?v=4"
              alt=""
            />
            <div class="absolute"></div>
          </div>
          <div class="flex flex-col space-y-1 justify-center items-center -mt-12 w-full">
            <span class="text-md whitespace-nowrap text-gray-50 font-semibold">
              {collection.name}
            </span>
            <span class="text-md whitespace-nowrap text-gray-100">
              by{" "}
              <Link
                to={`/user/${collection.user.id}`}
                className="hover:text-purple-400"
              >
                {collection.user.name}
              </Link>
            </span>
            <p class="text-sm text-gray-200 py-4">{collection.description}</p>

            <div class="py-4 flex justify-center items-center w-full divide-x divide-gray-400 divide-solid">
              <span class="text-center px-2">
                <span class="font-bold text-gray-50">56</span>
                <span class="text-gray-100"> favorited</span>
              </span>
              <span class="text-center px-2">
                <span class="font-bold text-gray-50">12</span>
                <span class="text-gray-100"> traits</span>
              </span>
              <span class="text-center px-2">
                <span class="font-bold text-gray-50">27</span>
                <span class="text-gray-100"> contributors</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;

// const card2 = () => {
//   return (
//     <div class="min-h-screen bg-gray-100 flex justify-center items-center">
//       <div class="container w-80 mx-auto  bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 duration-500">
//         <img class="w-full" src="https://i.imgur.com/iObhoAx.png" alt="" />
//         <div class="text-center relative py-14">
//           <span class="absolute transform -translate-x-10 -translate-y-24 z-50 text-green-500 bg-white rounded-full hover:text-green-400 transition-all duration-200 cursor-pointer">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               class="h-20 w-20"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fill-rule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
//                 clip-rule="evenodd"
//               />
//             </svg>
//           </span>
//           <h1 class="mb-1 text-2xl font-sans font-semibold text-gray-700 hover:text-gray-900 cursor-pointer">
//             Meditaciones en casa
//           </h1>
//           <span class="text-lg text-gray-700 hover:text-gray-900">
//             Susan Paz
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };
