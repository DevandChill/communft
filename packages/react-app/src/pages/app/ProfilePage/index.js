import { useState } from "react";
import { connect } from "react-redux";
import { useUserPublicData } from "@/hooks";
import { UserBanner, UserProfileEdit } from "@/components/profile";

// import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";
// const db = getFirestore();

const ProfilePage = ({ currentUser }) => {
  const { uid } = currentUser;
  const [profileEdit, setProfileEdit] = useState(false);

  const { userJoined, username, avatar, discord, github, twitter } =
    useUserPublicData(uid);

  return (
    <div className="">
      <UserBanner
        userJoined={userJoined}
        username={username}
        avatar={avatar}
        discord={discord}
        github={github}
        twitter={twitter}
        profile={true}
        editProfile={() => setProfileEdit(!profileEdit)}
      />
      <div>
        <div className="m-8">
          {profileEdit ? (
            <div>
              <UserProfileEdit
                uid={uid}
                closeEdit={() => setProfileEdit(!profileEdit)}
              />
            </div>
          ) : (
            <div>
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
              <div className="border-2 p-2 my-4">
                <div className="text-center font-semibold text-gray-800 text-2xl">
                  Watchlist
                </div>
                <div>Cards</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user,
  };
};

export default connect(mapStateToProps)(ProfilePage);
