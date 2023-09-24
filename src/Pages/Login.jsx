import { useContext, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/auth";

const Login = () => {
  const { auth } = useContext(AuthContext);
  const token = localStorage.getItem('token')
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (!token) {
      navigate('/login')
    } else {
      navigate('/')
    }
  }, [token])

  const changeInputHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await auth("login", formData);
      navigate('/')
    } catch (err) {
      setError(err.response.data.message)
      console.log(err.response.data.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[url('https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=600')] bg-no-repeat bg-cover">
      <form
        className="md-border-2 h-[50vh] w-[90vw] rounded-md px-1"
        onSubmit={loginHandler}
      >
        <h1 className="font-semibold text-3xl text-slate-200 mb-5">
          <span className="underline">Log</span>in
        </h1>
        <p className="text-white text-sm text-center mb-4">
          Login to connect with the World, Make new Friends share your thought
          through Tweets.
        </p>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          className="my-2 w-full py-1 px-2 rounded  bg-slate-300 text-blue-950 outline-none focus:ring-2 focus:ring-blue-700"
          placeholder="Username"
          name="username"
          onChange={changeInputHandler}
        />
        {/* <p className="text-red-500 text-sm">Something Went Wrong!</p> */}
        <input
          type="text"
          className="my-2 w-full py-1 px-2 rounded  bg-slate-300 text-blue-950 outline-none focus:ring-2 focus:ring-blue-700"
          placeholder="Password"
          name="password"
          onChange={changeInputHandler}
        />
        {/* <p className="text-red-500 text-sm">Something Went Wrong!</p> */}
        <p className="text-white mb-2">
          Don't have an Account?{" "}
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </p>
        <p className="text-white mb-2 text-center">
          By Continuing you agree to our <span>Terms and conditions</span> and
          have read our Privacy Policy.
        </p>
        <div className="flex justify-between items-center mt-5">
          <button type="button" className="text-white">
            Forget Password
          </button>
          <button
            type="submit"
            className="text-white bg-blue-800 hover:bg-blue-900 py-2 px-5 rounded"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
