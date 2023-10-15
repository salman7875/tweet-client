import axios from "axios";
import Header from "./Header";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutOption from "../Layout/LogoutOption";
import { AuthContext } from "../Context/auth";
import { hostEndPoint, localEndPoint } from "../Utils/request";

const Profile = ({ currentUser, type, posts, token }) => {
  const { currentUser: user, loading, error, logout } = useContext(AuthContext);
  const [showOption, setShowOption] = useState(false);
  const [clicked, setClicked] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setClicked(user?.followings.includes(currentUser?._id) | false);
  }, [user, currentUser]);

  const followUnfollowHandler = async () => {
    try {
      const { data } = await axios.put(
        `${localEndPoint}/users/${currentUser._id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (data.message === "User unfollowed") {
        setClicked(false);
      } else {
        setClicked(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Header>
        <h1 className="font-semibold text-3xl">salman_76</h1>
        <div className="flex items-center gap-2 relative">
          <Link to="/create-post">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Link>
          <button onClick={() => setShowOption(!showOption)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          {showOption && (
            <LogoutOption>
              <button
                className="shadow-sm px-3 py-1 text-xl font-semibold"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </LogoutOption>
          )}
        </div>
      </Header>
      {currentUser ? (
        <div className="px-6 mt-4">
          <div className="border-1 border-black flex flex-col items-center">
            <img
              src={`data:image/jpeg;base64${currentUser.avatar}`}
              alt="img"
              className="w-32 h-32 rounded-full overflow-hidden object-contain bg-white border-2 border-purple-600"
            />
            <p className="text-2xl font-medium">{currentUser.name}</p>
            <p className="text-xl font-medium text-gray-600 mb-1">
              @{currentUser.username}
            </p>
            <p className="text-lg text-center mb-1">{currentUser.bio}</p>
          </div>
          <ul className="flex justify-around mt-5">
            <li className="flex flex-col items-center">
              <p className="text-2xl text-gray-500 font-semibold">Post</p>
              <Link href="#" className="text-2xl font-semibold">
                {currentUser.tweets?.length}
              </Link>
            </li>
            <li className="flex flex-col items-center">
              <p className="text-2xl text-gray-500 font-semibold">Followers</p>
              <Link
                to={`/${currentUser._id}/followers`}
                className="text-2xl font-semibold"
              >
                {currentUser.followers?.length}
              </Link>
            </li>
            <li className="flex flex-col items-center">
              <p className="text-2xl text-gray-500 font-semibold">Followings</p>
              <Link
                to={`/${currentUser._id}/followings`}
                className="text-2xl font-semibold"
              >
                {currentUser.followings?.length}
              </Link>
            </li>
          </ul>
          {type === "current" ? (
            <Link
              to="edit-profile"
              className="w-full py-2 my-4 text-2xl font-medium border-2 border-gray-500 rounded-md inline-block text-center"
            >
              Edit Profile
            </Link>
          ) : (
            <button
              className="w-full py-2 my-4 text-2xl font-medium border-2 border-gray-500 rounded-md"
              onClick={followUnfollowHandler}
            >
              {clicked ? "Unfollow" : "Follow"}
            </button>
          )}

          <h1 className="text-2xl font-medium">Posts</h1>
          {posts?.length > 0 ? (
            <div className="grid grid-cols-3 gap-1 mt-2">
              {posts.map((post) => (
                <img
                  src={`data:image/jpeg;base64${post.content}`}
                  alt="post label"
                  className="w-40 h-40 object-cover"
                  key={post._id}
                />
              ))}
            </div>
          ) : (
            <h1 className="text-center text-3xl font-medium mt-5">No Posts</h1>
          )}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Profile;
