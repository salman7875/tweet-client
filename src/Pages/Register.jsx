import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/auth";

const Register = () => {
  const [data, setData] = useState({ username: '', name: '', email: '', password: '' }) 
  const [avatar, setAvatar] = useState("");
  const { auth } = useContext(AuthContext)
  const navigate = useNavigate();

  const convertToBase64 = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setAvatar(reader.result);
    };
    reader.onerror = (err) => {
      console.log(err.message);
    };
  };

  const changeInputHandler = e => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = {  avatar, ...data }
      await auth('register', formData)
      setTimeout(() => {
        navigate('/')
      }, 500)
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[url('https://images.pexels.com/photos/2422497/pexels-photo-2422497.jpeg?auto=compress&cs=tinysrgb&w=600')]">
      <form
        className="md-border-2 h-[60vh] w-[90vw] rounded-md px-1"
        onSubmit={registerHandler}
      >
        <h1 className="font-semibold text-3xl text-slate-200 mb-5">
          <span className="underline">Reg</span>istration
        </h1>
        <input
          type="file"
          className="my-2 w-70 py-2 px-2 rounded  bg-slate-300 text-blue-950 outline-none focus:ring-2 focus:ring-blue-700"
          placeholder="Avatar"
          onChange={convertToBase64}
        />
        <input
          type="text"
          className="my-2 w-full py-2 px-2 rounded  bg-slate-300 text-blue-950 outline-none focus:ring-2 focus:ring-blue-700"
          placeholder="Username"
          name="username"
          onChange={changeInputHandler}
          />
        {/* <p className="text-red-500 text-sm">Something Went Wrong!</p> */}
        <input
          type="text"
          className="my-2 w-full py-2 px-2 rounded  bg-slate-300 text-blue-950 outline-none focus:ring-2 focus:ring-blue-700"
          placeholder="Full Name"
          name="name"
          onChange={changeInputHandler}
          />
        {/* <p className="text-red-500 text-sm">Something Went Wrong!</p> */}
        {/* <p className="text-red-500 text-sm">Something Went Wrong!</p> */}
        <input
          type="text"
          className="my-2 w-full py-2 px-2 rounded  bg-slate-300 text-blue-950 outline-none focus:ring-2 focus:ring-blue-700"
          placeholder="Email..."
          name="email"
          onChange={changeInputHandler}
          />
        {/* <p className="text-red-500 text-sm">Something Went Wrong!</p> */}
        <input
          type="text"
          className="my-2 w-full py-2 px-2 rounded  bg-slate-300 text-blue-950 outline-none focus:ring-2 focus:ring-blue-700"
          placeholder="Password"
          name="password"
          onChange={changeInputHandler}
        />
        {/* <p className="text-red-500 text-sm">Something Went Wrong!</p> */}
        <p className="text-white mb-2">
          Don't have an Account?{" "}
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </p>
        <p className="text-white my-2 font-semibold">
          By Continuing you agree to our <span>Terms and conditions</span> and
          have read our Privacy Policy.
        </p>
        <div className="flex justify-end gap-4 items-center mt-5">
          <button
            type="button"
            className="text-black font-semibold text-xl bg-slate-300 py-2 px-4 rounded"
          >
            Reset Form
          </button>
          <button
            type="submit"
            className="text-white font-semibold text-xl  bg-blue-800 hover:bg-blue-900 py-2 px-5 rounded"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
