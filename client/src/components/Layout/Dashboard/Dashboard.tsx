import { Outlet } from "react-router-dom";

import Navbar from "../Header/Header";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="">
        {/* <div className="h-[calc(100vh-3rem)]"> */}
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
