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
    <div className="my-4 flex">
      <div>
        {currentUser.uid ? (
          <Button onClick={handleLogout}>Log Out</Button>
        ) : (
          <Button onClick={handleLogin}>Login</Button>
        )}
      </div>
    </div>
  );
};

export default PublicHeader;
