import { useEffect, useState, useContext, createContext } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import firebaseApp from "./services/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
  UserExplorePage,
  CreateCollectionPage,
  DesignPage,
  MintingPage,
  ProfilePage,
} from "./pages/app";

import {
  LandingPage,
  ExplorePage,
  CreatePage,
  CollectionPage,
  LeaderboardPage,
  PlaygroundPage,
  UserPage,
  PrivacyPage,
  NotFoundPage,
} from "./pages/public";

import { AppHeader } from "./components/layout";

const auth = getAuth(firebaseApp);

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path={"/"} element={<LandingPage />} />
          <Route
            path={"/explore"}
            element={
              <CheckAuth path={"/app/explore"}>
                <ExplorePage />
              </CheckAuth>
            }
          />
          <Route
            path={"/create"}
            element={
              <CheckAuth path={"/app/create"}>
                <CreatePage />
              </CheckAuth>
            }
          />
          <Route path={"/collection/:id"} element={<CollectionPage />} />
          <Route path={"/user/:id"} element={<UserPage />} />
          <Route path={"/leaderboard"} element={<LeaderboardPage />} />
          <Route path={"/playground"} element={<PlaygroundPage />} />
          <Route path={"/privacy"} element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route
            path={"/app/explore"}
            element={
              <RequireAuth>
                <UserExplorePage />
              </RequireAuth>
            }
          />
          <Route
            path={"/app/create"}
            element={
              <RequireAuth>
                <CreateCollectionPage />
              </RequireAuth>
            }
          />
          <Route
            path={"/app/design"}
            element={
              <RequireAuth>
                <DesignPage />
              </RequireAuth>
            }
          />
          <Route
            path={"/app/minting"}
            element={
              <RequireAuth>
                <MintingPage />
              </RequireAuth>
            }
          />
          <Route
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
