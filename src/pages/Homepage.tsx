import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setLogout } from "../stateManager/userSlice";
import { toast } from "react-toastify";
import { Hero } from "../components/Hero";
import TaskContainer from "../components/taskComponent/TaskContainer";

const Homepage = () => {
  const user = useSelector((state: any) => state.user);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToTaskContainer = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView();
      // containerRef.current.scrollTo({ behavior: "smooth", top: 10 });
    }
  };

  return (
    <div className="overflow-hidden bg-slate-950 text-slate-100">
      {user.user === null &&
        (toast.error("please login first "), (<Navigate to={"/"} />))}

      <Hero scrollToTaskContainer={scrollToTaskContainer} />
      <TaskContainer forwardedRef={containerRef} />
    </div>
  );
};

export default Homepage;
