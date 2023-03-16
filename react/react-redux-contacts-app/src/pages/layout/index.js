import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="container mx-auto  rounded-[20px] bg-gray-400  p-6 mt-12">
      <Outlet />
    </div>
  );
}

export default Layout;
