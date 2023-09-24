import React, { useEffect, useState } from "react";
import Profile from "../Component/Profile";
import axios from "axios";
import useCurrentUser from "../Hooks/useCurrentUser";

const UserProfile = () => {
  const token = localStorage.getItem("token");
  const { loading, data, error } = useCurrentUser();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/tweets/current",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        setPosts(data.tweets);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Profile currentUser={data} type={"current"} posts={posts} token={token} />
  );
};

export default UserProfile;
