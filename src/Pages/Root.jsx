import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";

const Root = () => {
  return (
    <div className="min-h-screen bg-slate-200">
      <Outlet />
      <Navbar />
    </div>
  );
};

export default Root;
