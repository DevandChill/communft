import { useEffect, useState, useContext, createContext } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import firebaseApp from "./services/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import UserExplorePage from "@/pages/app/UserExplorePage";
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

import { AppHeader } from "@/components/layout";

const auth = getAuth(firebaseApp);

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route exact path={"/"} element={<LandingPage />} />
          <Route
            exact
            path={"/explore"}
            element={
              <CheckAuth path={"/app/explore"}>
                <ExplorePage />
              </CheckAuth>
            }
          />
          <Route
            exact
            path={"/create"}
            element={
              <CheckAuth path={"/app/create"}>
                <CreatePage />
              </CheckAuth>
            }
          />
          <Route exact path={"/collection/:id"} element={<CollectionPage />} />
          <Route exact path={"/user/:id"} element={<UserPage />} />
          <Route exact path={"/leaderboard"} element={<LeaderboardPage />} />
          <Route exact path={"/playground"} element={<PlaygroundPage />} />
          <Route exact path={"/privacy"} element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route
            exact
            path={"/app/explore"}
            element={
              <RequireAuth>
                <UserExplorePage />
              </RequireAuth>
            }
          />
          <Route
            exact
            path={"/app/create"}
            element={
              <RequireAuth>
                <CreateCollectionPage />
              </RequireAuth>
            }
          />
          <Route
            exact
            path={"/app/design"}
            element={
              <RequireAuth>
                <DesignPage />
              </RequireAuth>
            }
          />
          <Route
            exact
            path={"/app/minting"}
            element={
              <RequireAuth>
                <MintingPage />
              </RequireAuth>
            }
          />
          <Route
            exact
            path={"/app/profile"}
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

const AppLayout = () => {
  let auth = useAuth();
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center py-4">
          <AppHeader user={auth.user} />
        </header>
        <main className="flex-1 overflow-auto bg-gray-200">
          <div className="py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        auth.currentUser.getIdTokenResult().then(function ({ claims }) {
          setUser(claims.user_id);
          setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  let value = { user, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

const RequireAuth = ({ children }) => {
  let auth = useAuth();
  if (auth.loading) {
    return <div>Loading...</div>;
  }

  if (!auth.user && !auth.loading) {
    return <Navigate to="/" />;
  }

  return children;
};

const CheckAuth = ({ children, path }) => {
  let auth = useAuth();
  if (auth.loading) {
    return <div>Loading...</div>;
  }

  if (auth.user && !auth.loading) {
    return <Navigate to={path} />;
  }

  return children;
};
