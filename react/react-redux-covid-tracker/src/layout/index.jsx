import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Routes from "../routes/index"

const Layout = () => {
  return (
    <>
        <Navbar />
        <Routes />
        <Footer />
    </>
  )
};

export default Layout;
