import axios from "axios";
import { useEffect, useState } from "react";
import { hostEndPoint, localEndPoint } from "../Utils/request";

const useCurrentUser = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${localEndPoint}/current`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        if (!data.success) {
          throw new Error("Something went wrong. Current User!");
        }
        setLoading(false);
        setData(data.user);
      } catch (err) {
        console.log(err);
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useCurrentUser;
