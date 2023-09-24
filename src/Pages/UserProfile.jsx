import React, { useEffect, useState } from "react";
import Profile from "../Component/Profile";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const token = localStorage.getItem("token");
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchSingleUser = async () => {
      try {
        const { data } = await axios.get(
          `https://tweet-spot.onrender.com/api/users/${id}`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        if (data.success) {
          setCurrentUser(data.user);
        } else {
          throw new Error("Something went wrong, CurrentUser!");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSingleUser();
  }, [id]);

  useEffect(() => {
    const fetchSingleUserPost = async () => {
      try {
        const { data } = await axios.get(
          `https://tweet-spot.onrender.com/api/tweets/${id}`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        if (data.success) {
          setPosts(data.tweets);
          console.log(data);
        } else {
          throw new Error("Something went wrong, CurrentUser!");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSingleUserPost();
  }, [id]);

  return (
    <Profile
      currentUser={currentUser}
      type={"another"}
      token={token}
      posts={posts}
    />
  );
};

export default UserProfile;
