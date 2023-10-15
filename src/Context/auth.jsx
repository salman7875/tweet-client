import axios from "axios";
import { createContext, useState } from "react";
import { localEndPoint, hostEndPoint } from "../Utils/request";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const auth = async (type, formData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${localEndPoint}/${type}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (data.success) {
        setToken(data.token);
        setLoading(false);
        setCurrentUser(data.user);
        localStorage.setItem("token", data.token);
      } else {
        throw new Error({ message: data.response.data.message });
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCurrentUser("");
  };

  return (
    <AuthContext.Provider
      value={{ token, auth, logout, currentUser, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
