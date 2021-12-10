import { Link } from "react-router-dom";
import { signInWithWeb3 } from "@/util/login/index.ts";
import { Button } from "@/components/elements";
import firebaseApp from "@/services/firebase";
import { getAuth, signOut } from "firebase/auth";
import { selectCurrentUser, setSignOut } from "@/store/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

const auth = getAuth();

const PublicHeader = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const handleLogin = () => {
    console.log("handleLogin");
    signInWithWeb3(firebaseApp);
  };
  const handleLogout = () => {
    console.log("handleLogout");
    signOut(auth);
    dispatch(setSignOut());
  };
  return (
    <div className="my-4 flex justify-between">
      <div className="mx-4">
        <Link to="/">Communft</Link>
      </div>
      <div className="flex">
        <div className="mx-4 py-1">
          <Link to="/collections">Explore</Link>
        </div>
        <div className="mx-4 py-1">
          <Link to="/app/create">Create</Link>
        </div>
        <div className="mx-4">
          {currentUser.uid ? (
            <Button width="half" onClick={handleLogout}>
              Log Out
            </Button>
          ) : (
            <Button width="half" onClick={handleLogin}>
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicHeader;
