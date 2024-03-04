import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../apiConnection/axios";
import { setTask } from "@/stateManager/taskSlice";
import { Spotlight } from "./spotlight/Spotlight";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "./starCard/StarBg";
import { Button } from "../ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RiDeleteBin3Line } from "react-icons/ri";
import { toast } from "sonner";

interface TaskInterface {
  _id?: string | number;
  title: string;
  task?: "default" | "workout" | "study" | "others" | "coding";
  status?: "pending" | "completed";
  type?: string;
  date?: string;
  isImportant?: boolean;
  time?: string;
}

const OneTask = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<TaskInterface>();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    axios.get(`/tasks/${id}`).then((res) => {
      dispatch(setTask(res.data));

      setData(res.data);
      setLoading(false);
    });
  }, []);

  const handleDeleteTask = (id: string) => {
    const check = confirm("are you sure you want to delete this task");
    if (check) {
      axios.delete(`/tasks/${id}`).then((res) => {
        toast("task deleted successfully");
        navigate("/home");
      });
    } else {
      toast("task is not deleted");
    }
  };
  const markAsDone = (task: any) => {
    axios
      .put(`/tasks/${task._id}`, {
        status: "completed",
      })
      .then((res) => {
        dispatch(setTask(res.data));
        toast("Task Done", {
          position: "top-right",
        });
      });
  };

  //   const task = useSelector((state: any) => state.task);
  //   console.log(task);
  if (loading) {
    return (
      <div className="bg-slate-950 h-[100vh] flex items-center justify-center">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    ); // Display loading message while fetching data
  }
  return (
    <div className="min-h-[100vh] pt-2 mx-auto flex items-center flex-col bg-slate-950 text-slate-500">
      <div
        onClick={() => navigate("/home")}
        className="self-start justify-start cursor-pointer"
      >
        {" "}
        {`<- go back`}
      </div>

      <Button
        variant="destructive"
        onClick={() => {
          handleDeleteTask(data?._id as string);
        }}
        className="mb-4 text-slate-200"
      >
        <RiDeleteBin3Line className="text-slate-200 text-xl" />
        Delete Task
      </Button>
      <Spotlight className="-top-0 left-0 md:left-60 md:-top-20" fill="white" />
      {/* <h1 className="text-xl pb- md:text-2xl lg:text-3xl mx-auto text-center">
        You know what to do
      </h1> */}

      <GlowingStarsBackgroundCard className=" w-[80vw]  min-h-[10vh] mb-10">
        <p className="py-3">{data?.type}</p>
        <GlowingStarsTitle className="pb-2 flex justify-between border-b-2 border-slate-500">
          <p>{data?.title.toUpperCase()}</p>
          <p className="text-[.6rem]">{data?.time}</p>
        </GlowingStarsTitle>

        <GlowingStarsDescription className=" md:pl-5 lg:pl-10 lg:self-center lg:justify-self-center leading-7">
          {data?.task}
        </GlowingStarsDescription>

        {data?.status === "completed" ? (
          <Button disabled className="my-2 lg:ml-10" variant="outline">
            Completed
          </Button>
        ) : (
          <Button
            onClick={() => markAsDone(data)}
            className="my-2 lg:ml-10"
            variant="outline"
          >
            Mark as done
          </Button>
        )}
      </GlowingStarsBackgroundCard>
    </div>
  );
};

export default OneTask;
