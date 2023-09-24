import { useEffect, useState } from "react";
import PostOption from "../Layout/PostOption";
import { Link } from "react-router-dom";
import axios from "axios";

const Post = ({ feed, token }) => {
  const [showOption, setShowOption] = useState(false);
  const [liked, setLiked] = useState(null);
  const [likes, setLikes] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLikes(feed.likes.length);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("https://tweet-spot.onrender.com/api/current", {
          headers: { Authorization: "Bearer " + token },
        });
        if (!data.success) {
          throw new Error("Something went wrong. Fetching!");
        } else {
          setUser(data.user);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    setLiked(feed.likes.includes(user?._id) | false);
  }, [feed, user]);

  const likeUnlikeHandler = async () => {
    try {
      const { data } = await axios.put(
        `https://tweet-spot.onrender.com/api/tweets/action/${feed._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (data.message === "Tweet Unliked") {
        setLiked(false);
        setLikes(data.likes);
      } else {
        setLiked(true);
        setLikes(data.likes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="py-4">
      <div className="flex justify-between items-center px-2 py-1 relative">
        <div className="flex gap-2 items-center">
          <img
            src={`data:image/jpeg;base64${feed.author.avatar}`}
            alt="test img"
            className="w-16 h-16 rounded-full object-cover"
          />
          <Link to={`/user/${feed.author._id}`} className="flex flex-col">
            <span className="text-xl font-medium">{feed.author.username}</span>
            <span className="text-lg font-medium text-gray-600">
              {feed.author.name}
            </span>
          </Link>
        </div>
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
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </button>
        {showOption && (
          <PostOption>
            <button className="shadow-sm py-1 px-4">Share</button>
            <button className="shadow-sm">Delete</button>
          </PostOption>
        )}
      </div>
      <div className="h-80 w-full  bg-black">
        <img
          src={`data:image/jpeg;base64${feed.content}`}
          alt=""
          className="h-full w-full object-center object-contain"
        />
      </div>
      <div className="px-2">
        <div className="flex mt-1">
          <button className="me-3" onClick={likeUnlikeHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={liked ? "fill" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
          <Link to={`/comments/${feed._id}`}>
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
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
              />
            </svg>
          </Link>
        </div>
        <span className="block text-xl">{likes} likes</span>
        <span className="block text-lg text-gray-700">
          <Link to={`/user/${feed.author._id}`} className="font-medium text-xl">
            {feed.author.username}:{" "}
          </Link>
          {feed.caption}
        </span>
        {/* <Link to="#" className="block text-sm text-gray-700">
          23k+ More comments...
        </Link> */}
      </div>
    </section>
  );
};

export default Post;
