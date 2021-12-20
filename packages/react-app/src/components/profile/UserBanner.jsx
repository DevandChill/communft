import { bannerFormatDate } from "@/utils/formatDate";
import { ethers } from "ethers";
import Davatar from "@davatar/react";

const UserBanner = ({
  userJoined,
  username,
  avatar,
  discord,
  github,
  twitter,
}) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log(avatar);

  return (
    <div className="bg-gray-200">
      <div
        className="w-full bg-cover bg-no-repeat bg-center bg-gray-800"
        style={{
          height: "200px",
          backgroundImage: "",
        }}
      >
        {/* <img className="opacity-0 w-full h-full" src="" alt="" /> */}
      </div>
      <div className="p-4">
        <div className="relative flex w-full">
          <div className="flex flex-1">
            <div style={{ marginTop: "-6rem" }}>
              <div
                style={{ height: "9rem", width: "9rem" }}
                className="md rounded-full relative avatar"
              >
                {avatar && (
                  <Davatar size={120} provider={provider} address={avatar} />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col text-right">
            {/* <button className="flex justify-center max-h-max whitespace-nowrap focus:outline-none  focus:ring  max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto">
              Edit Profile
            </button> */}
          </div>
        </div>

        <div className="space-y-1 justify-center w-full mt-3 ml-3">
          <div>
            <h2 className="text-xl leading-6 font-bold text-gray-600">
              {username}
            </h2>
          </div>

          <div className="mt-3">
            <p className="text-gray-600 leading-tight mb-2">
              {github && <span> Github: {github} | </span>}
              {twitter && <span> Twitter: {twitter} | </span>}
              {discord && <span> Discord: {discord} </span>}
            </p>
            <div className="text-gray-600 flex">
              {userJoined && (
                <span className="flex mr-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 paint-icon">
                    <g>
                      <path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path>
                      <circle cx="7.032" cy="8.75" r="1.285"></circle>
                      <circle cx="7.032" cy="13.156" r="1.285"></circle>
                      <circle cx="16.968" cy="8.75" r="1.285"></circle>
                      <circle cx="16.968" cy="13.156" r="1.285"></circle>
                      <circle cx="12" cy="8.75" r="1.285"></circle>
                      <circle cx="12" cy="13.156" r="1.285"></circle>
                      <circle cx="7.032" cy="17.486" r="1.285"></circle>
                      <circle cx="12" cy="17.486" r="1.285"></circle>
                    </g>
                  </svg>{" "}
                  <span className="leading-5 ml-1">
                    Joined : {bannerFormatDate(userJoined)}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-800" />
    </div>
  );
};
export default UserBanner;
