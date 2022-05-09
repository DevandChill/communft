import { useLocation } from "react-router-dom";
import { useUserPublicData } from "@/hooks";
import { UserBanner } from "@/components/profile";

export const UserPage = () => {
  const address = useLocation().pathname.replace("/user/", "");
  const {
    userAccount,
    userJoined,
    username,
    avatar,
    discord,
    github,
    twitter,
  } = useUserPublicData(address);

  if (!username && !userAccount) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-700 text-2xl font-semibold">
        Loading...
      </div>
    );
  } else {
    if (userAccount === "invalid") {
      return (
        <div>
          <UserBanner username="INVAILD USER" />
        </div>
      );
    } else {
      return (
        <div>
          <UserBanner
            userJoined={userJoined}
            username={username}
            avatar={avatar}
            discord={discord}
            github={github}
            twitter={twitter}
          />
          <div>
            {userAccount ? (
              <div className="m-8">
                <div className="border-2 p-2 my-4">
                  <div className="text-center font-semibold text-gray-800 text-2xl">
                    Collections
                  </div>
                  <div>Cards</div>
                </div>
                <div className="border-2 p-2 my-4">
                  <div className="text-center font-semibold text-gray-800 text-2xl">
                    Traits
                  </div>
                  <div>Cards</div>
                </div>
              </div>
            ) : (
              <div className="my-8 flex items-center justify-center text-gray-700 text-2xl font-semibold">
                User hasn't created an account yet
              </div>
            )}
          </div>
        </div>
      );
    }
  }
};
