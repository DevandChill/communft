import { useEffect } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import firebaseApp from "./services/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { setUserLogin } from "./store/user/userSlice";
import { useDispatch } from "react-redux";

import CreateCollectionPage from "@/pages/app/CreateCollectionPage";
import DesignPage from "@/pages/app/DesignPage";
import MintingPage from "@/pages/app/MintingPage";
import ProfilePage from "@/pages/app/ProfilePage";

import LandingPage from "@/pages/public/LandingPage";
import ExplorePage from "@/pages/public/ExplorePage";
import CreatePage from "@/pages/public/CreatePage";
import CollectionPage from "@/pages/public/CollectionPage";
import LeaderboardPage from "@/pages/public/LeaderboardPage";
import PlaygroundPage from "@/pages/public/PlaygroundPage";
import UserPage from "@/pages/public/UserPage";
import PrivacyPage from "@/pages/public/PrivacyPage";

import NotFoundPage from "@/pages/public/NotFoundPage";

import { PublicHeader } from "@/components/layout";
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
          <Route exact path={"/explore"} element={<ExplorePage />} />
          <Route exact path={"/create"} element={<CreatePage />} />
          <Route exact path={"/collection/:id"} element={<CollectionPage />} />
          <Route exact path={"/user/:id"} element={<UserPage />} />
          <Route exact path={"/leaderboard"} element={<LeaderboardPage />} />
          <Route exact path={"/playground"} element={<PlaygroundPage />} />
          <Route exact path={"/privacy"} element={<PrivacyPage />} />

          <Route path="*" element={<NotFoundPage />} />
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
      {/* <PublicFooter /> */}
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="">
      <div className="">
        <PublicHeader />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};
