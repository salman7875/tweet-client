import { useEffect, useState } from "react";
import Overlay from "../Layout/Overlay";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState("");
  const [searchedUser, setSearchedUser] = useState([]);
  const [exploreData, setExploreData] = useState([]);

  useEffect(() => {
    const fetchAllTweets = async () => {
      try {
        const { data } = await axios.get("https://tweet-spot.onrender.com/api/tweets/");
        setExploreData(data.tweets);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTweets();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.post(
          "https://tweet-spot.onrender.com/api/find",
          { username: user },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!data.success) {
          throw new Error('Something went wrong. Searching!')
        }
        setSearchedUser(data.user)
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(() => {
      user && fetchUser();
    }, 400);
  }, [user]);

  return (
    <>
      <div className="py-2">
        <input
          type="text"
          placeholder="Search..."
          className="w-[80vw] h-14 py-2 px-3 text-xl bg-slate-100 focus:ring-1 ring-inset ring-black outline-none"
          onFocus={() => setShow(true)}
          onChange={(e) => setUser(e.target.value)}
        />
        <button className="w-[20vw] text-2xl" onClick={() => setShow(false)}>
          Cancel
        </button>
      </div>
      {show ? (
        <Overlay>
          <ul>
            {searchedUser?.map((data) => (
              <li
                className="flex justify-between px-4 py-3 shadow"
                key={data._id}
              >
                <Link to={`/user/${data._id}`}>
                  <div className="flex gap-3">
                    <img
                      src={`data:image/jpeg;base64${data.avatar}`}
                      alt="img"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="inline-block text-2xl font-medium">
                        {data.username}
                      </span>
                      <span className="inline-block text-xl font-medium text-gray-600">
                        {data.name}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Overlay>
      ) : (
        <div className="grid grid-cols-3 gap-1">
          {exploreData.map((data) => (
            <Link to='/' key={data._id}>
              <img
                src={`data:image/jpeg;base64${data.content}`}
                key={data._id}
                className="w-full h-48 object-cover"
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Search;
