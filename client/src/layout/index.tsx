import { Outlet } from "react-router";

import Navbar from "@/pageComponents/Navbar";

const Layout = () => {
  return (
    <div className="w-screen h-screen relative bg-[#e2e8f0]">
      <Navbar />
      <div className="w-full h-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
