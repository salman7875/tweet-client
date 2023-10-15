import React, { useCallback, useContext, useEffect, useState } from "react";
import Profile from "../Component/Profile";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Context/auth";
import { hostEndPoint, localEndPoint } from "../Utils/request";

const UserProfile = () => {
  const { token } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const { id } = useParams();

  const fetchSingleUser = useCallback(async () => {
    try {
      const { data } = await axios.get(`${localEndPoint}/users/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      if (data.success) {
        setCurrentUser(data.user);
      } else {
        throw new Error("Something went wrong, CurrentUser!");
      }
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const fetchSingleUserPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`${localEndPoint}/tweets/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      if (data.success) {
        setPosts(data.tweets);
      } else {
        throw new Error("Something went wrong, CurrentUser!");
      }
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    fetchSingleUser();
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
