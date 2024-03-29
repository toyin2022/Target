import { useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Hero } from "../components/Hero";
import TaskContainer from "../components/taskComponent/TaskContainer";

const Homepage = () => {
  const user = useSelector((state: any) => state.user);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToTaskContainer = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView();
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
