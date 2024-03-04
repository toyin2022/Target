import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import mygif from "../assets/gif.gif";
import Footer from "./Footer";
import Navbar from "./Navbar";

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
