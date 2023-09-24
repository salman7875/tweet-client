import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const auth = async (type, formData) => {
    const { data } = await axios.post(
      `https://tweet-spot.onrender.com/api/${type}`,
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (data.success) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
    } else {
      console.log(data.response.data.message);
      throw new Error(data.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCurrentUser("");
  };

  return (
    <AuthContext.Provider value={{ token, auth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
