import Comments from "./Pages/Comments";
import CreatePost from "./Pages/CreatePost";
import EditProfile from "./Pages/EditProfile";
import Feed from "./Pages/Feed";
import FollowersFollowings from "./Pages/FollowersFollowings";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Register from "./Pages/Register";
import Root from "./Pages/Root";
import Search from "./Pages/Search";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import CurrentUser from "./Pages/CurrentUser";
import UserProfile from "./Pages/UserProfile";
import { useEffect, useState } from "react";

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
          <Route index element={<Feed />} />
          <Route path="explore" element={<Search />} />
          <Route path="comments/:id" element={<Comments />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="profile" element={<Root />}>
            <Route index element={<CurrentUser />} />
            <Route path=":id" element={<EditProfile />} />
          </Route>
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/:id/followers" element={<FollowersFollowings />} />
          <Route path="/:id/followings" element={<FollowersFollowings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
