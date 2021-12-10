import { useEffect } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import firebaseApp from "./services/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { setUserLogin } from "./store/user/userSlice";
import { useDispatch } from "react-redux";

import LandingPage from "@/pages/public/Landing";
import ExploreCollectionsPage from "@/pages/public/ExploreCollectionsPage";
import ExploreUserPage from "@/pages/public/ExploreUserPage";
import LeaderboardPage from "@/pages/public/LeaderboardPage";
import PrivacyPage from "@/pages/public/Privacy";

import CreateCollectionPage from "@/pages/app/CreateCollectionPage";
import DesignPage from "@/pages/app/DesignPage";
import MintingPage from "@/pages/app/MintingPage";
import ProfilePage from "@/pages/app/ProfilePage";
import TraitsPage from "@/pages/app/TraitsPage";

import { PublicHeader, PublicFooter } from "@/components/layout";
// import { AppHeader, PublicHeader, PublicFooter } from "@/components/layout";

const auth = getAuth(firebaseApp);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("user", user);
        auth.currentUser.getIdTokenResult().then(function ({ claims }) {
          // console.log(claims);
          dispatch(
            setUserLogin({
              uid: claims.user_id,
            })
          );
        });
      } else {
        // console.log("no user");
      }
    });
  }, [dispatch]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route exact path={"/"} element={<LandingPage />} />
          <Route exact path={"/privacy"} element={<PrivacyPage />} />
          <Route
            exact
            path={"/collections"}
            element={<ExploreCollectionsPage />}
          />
          <Route exact path={"/user"} element={<ExploreUserPage />} />
          <Route exact path={"/leaderboard"} element={<LeaderboardPage />} />
        </Route>

        <Route path="/app" element={<AppLayout />}>
          <Route
            exact
            path={"/app/create"}
            element={<CreateCollectionPage />}
          />
          <Route exact path={"/app/design"} element={<DesignPage />} />
          <Route exact path={"/app/minting"} element={<MintingPage />} />
          <Route exact path={"/app/profile"} element={<ProfilePage />} />
          <Route exact path={"/app/traits"} element={<TraitsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

const PublicLayout = () => {
  return (
    <div>
      <PublicHeader />
      <Outlet />
      <PublicFooter />
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="">
      <div className="">
        <PublicHeader />
      </div>
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};
