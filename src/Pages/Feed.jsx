import { useEffect, useState } from "react";
import Header from "../Component/Header";
import Post from "../Component/Post";
import axios from "axios";
import { hostEndPoint, localEndPoint } from "../Utils/request";

const Feed = () => {
  const token = localStorage.getItem("token");
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFeedOfFollowings = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${localEndPoint}/feed`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        if (!data.success) {
          throw new Error("Something went wrong. Feed!");
        } else {
          setFeeds(data.tweets);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    };
    fetchFeedOfFollowings();
  }, []);

  return (
    <>
      <Header>
        <h1 className="text-3xl font-medium">TweetSpot</h1>
        <a href="#">
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
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        </a>
      </Header>
      {loading && <h1>Loading...</h1>}
      {feeds.length > 0 ? (
        <div>
          {feeds.map((feed) => (
            <Post key={feed._id} feed={feed} token={token} />
          ))}
        </div>
      ) : (
        <h1 className="text-center text-4xl font-bold mt-72">No Posts</h1>
      )}
    </>
  );
};

export default Feed;
