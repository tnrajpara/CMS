"use client";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/AddProduct";
import Inventory from "./pages/Inventory";

const Page = () => {
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [path, setPath] = useState([
    "Home",
    "Posts",
    "Inventory",
    "Add Product",
  ]);
  const [selectNav, setSelectNav] = useState(path[0]);

  return (
    <div className="bg-gray-900 text-gray-100 h-screen">
      <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      {openSidebar && (
        <Sidebar
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
          path={path}
          selectNav={path[0]}
          setSelectNav={setSelectNav}
        />
      )}
      {selectNav === "Add Product" && <AddProduct />}
      {selectNav === "Inventory" && <Inventory />}
    </div>
  );
};

export default Page;
