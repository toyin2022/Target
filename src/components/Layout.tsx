import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import mygif from "../assets/gif.gif";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
          className="bg-slate-950"
        >
          <img
            style={{ backgroundColor: "white" }}
            src={mygif}
            alt=" loading gif"
          />
        </div>
      ) : (
        <Outlet />
      )}

      <Footer />
    </>
  );
};

export default Layout;
