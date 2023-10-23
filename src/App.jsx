import { Suspense, lazy, useEffect, useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

const Comments = lazy(() => import("./Pages/Comments"));
const CreatePost = lazy(() => import("./Pages/CreatePost"));
const EditProfile = lazy(() => import("./Pages/EditProfile"));
const Feed = lazy(() => import("./Pages/Feed"));
const FollowersFollowings = lazy(() => import("./Pages/FollowersFollowings"));
const Login = lazy(() => import("./Pages/Login"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Register = lazy(() => import("./Pages/Register"));
const Root = lazy(() => import("./Pages/Root"));
const Search = lazy(() => import("./Pages/Search"));
const CurrentUser = lazy(() => import("./Pages/CurrentUser"));
const UserProfile = lazy(() => import("./Pages/UserProfile"));

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") | null);

  useEffect(() => {
    setTimeout(() => {
      setToken(localStorage.getItem("token"));
    });
  }, []);

  const ProtectedRoute = ({ path, element }) => {
    return token ? element : <Navigate to={path} replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={<ProtectedRoute path="/login" element={<Root />} />}
        >
          <Route
            index
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <Feed />
              </Suspense>
            }
          />
          <Route
            path="explore"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <Search />
              </Suspense>
            }
          />
          <Route
            path="comments/:id"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <Comments />
              </Suspense>
            }
          />
          <Route
            path="create-post"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <CreatePost />
              </Suspense>
            }
          />
          <Route
            path="profile"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <Root />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<p>Loading...</p>}>
                  <CurrentUser />
                </Suspense>
              }
            />
            <Route
              path=":id"
              element={
                <Suspense fallback={<p>Loading...</p>}>
                  <EditProfile />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/user/:id"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <UserProfile />
              </Suspense>
            }
          />
          <Route
            path="/:id/followers"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <FollowersFollowings />
              </Suspense>
            }
          />
          <Route
            path="/:id/followings"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <FollowersFollowings />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
