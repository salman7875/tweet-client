import React, { useContext, useEffect, useState } from "react";
import Profile from "../Component/Profile";
import axios from "axios";
import { AuthContext } from "../Context/auth";
import { hostEndPoint, localEndPoint } from "../Utils/request";

const UserProfile = () => {
  const { token, loading, error, currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${localEndPoint}/tweets/current`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        setPosts(data.tweets);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Profile
      currentUser={currentUser}
      type={"current"}
      posts={posts}
      token={token}
    />
  );
};

export default UserProfile;
