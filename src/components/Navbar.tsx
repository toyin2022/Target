import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setLogout } from "../stateManager/userSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  return (
    <nav className="bg-slate-950 shadow-2xl  p-8 w-full ">
      <div className=" mx-auto w-full flex justify-around items-center px-4">
        <p className="text-white text-lg font-bold w-1/2">Target</p>
        <ul className="flex space-x-4 w-1/2">
          {user.user ? (
            <li className="text-white hover:text-gray-300 cursor-pointer">
              {user.user.email.length > 4
                ? user?.user?.email.slice(0, 4) + "..."
                : user?.user?.email}
            </li>
          ) : (
            ""
          )}
          <li
            onClick={handleLogout}
            className="text-white hover:text-gray-300 cursor-pointer"
          >
            {user.user ? "Logout" : ""}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
