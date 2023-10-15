import { Link, useLocation, useParams } from "react-router-dom";
import Header from "../Component/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { hostEndPoint, localEndPoint } from "../Utils/request";

const FollowersFollowings = () => {
  const location = useLocation().pathname.split("/").at(-1);
  const { id } = useParams();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${localEndPoint}/users/${id}/${location}`
        );
        if (!data.success) {
          throw new Error("Something went wrong. Followers or Followings!");
        } else {
          setUsers(data.users);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  return (
    <section>
      <Header>
        <Link to="..">
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
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Link>
        <h1 className="text-3xl font-medium">
          {location[0].toUpperCase() + location.slice(1, -1)}
        </h1>
      </Header>
      <ul>
        {users &&
          users.map((data) => (
            <li
              className="flex justify-between px-4 py-3 shadow"
              key={data._id}
            >
              <Link to={`/user/${data._id}`}>
                <div className="flex gap-3">
                  <img
                    src={data.avatar}
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
    </section>
  );
};

export default FollowersFollowings;
