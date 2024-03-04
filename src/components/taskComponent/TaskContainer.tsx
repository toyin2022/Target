import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import axios from "../../apiConnection/axios";
import { useDispatch, useSelector } from "react-redux";
import { setTask, setTasks } from "@/stateManager/taskSlice";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { FiFilter } from "react-icons/fi";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Meteors } from "./meator/Meators";
import { Loader2 } from "lucide-react";

interface TaskContainerProps {
  forwardedRef: React.RefObject<HTMLDivElement>;
}
interface TaskInterface {
  _id: string | number;
  title: string;
  task: "default" | "workout" | "study" | "others" | "coding";
  status: "pending" | "completed";
  type: string;
  date?: string;
  isImportant?: boolean;
  time?: string;
}

const TaskContainer: React.FC<TaskContainerProps> = ({ forwardedRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter] = useState("");
  const [dayFilter, setDayFilter] = useState("");
  const [searchTask, setSearchTask] = useState("");
  const { tasks } = useSelector((state: any) => state.tasks);
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>(tasks);
  const [title, settitle] = useState("");
  const [details, setdetails] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDetails, setEditDetails] = useState("");
  const [newTask, setnewTask] = useState(false);
  const [deleteTask, setdeleteTask] = useState(false);
  const [def, setdef] = useState("");
  const [btnLoad, setBtnLoad] = useState(false);
  const [editted, setEditted] = useState(false);
  const [complete, setcomplete] = useState([]);
  const [deleteForever, setdeleteForever] = useState(false);
  const [tab, settab] = useState(false);

  useEffect(() => {
    axios.get(`/tasks?type=${typeFilter}&date=${dayFilter}`).then((res) => {
      dispatch(setTasks(res.data.tasks));
    });
    const completedTasks = tasks
      .filter((task: TaskInterface) => task.status === "completed")
      .filter((task: any) =>
        task.title.toLowerCase().includes(searchTask.toLowerCase())
      );
    setcomplete(completedTasks);
  }, [
    typeFilter,
    tab,
    dayFilter,
    newTask,
    deleteTask,
    btnLoad,
    editted,
    deleteForever,
  ]);

  useEffect(() => {
    const filtered = tasks
      .filter((task: TaskInterface) => task.status === "pending")
      .filter((task: any) =>
        task.title.toLowerCase().includes(searchTask.toLowerCase())
      );
    setFilteredTasks(filtered);
  }, [searchTask, tasks, typeFilter, dayFilter]);

  const handleDayFilter = (e: any) => {
    setDayFilter(e.target.value);
  };
  const handleTypeFilter = (e: any) => {
    setTypeFilter(e.target.value);
  };
  const addTaskType = (e: any) => {
    setdef(e.target.value);
  };

  const handleAddTask = (e: any) => {
    e.preventDefault();

    if (title === "" || details === "" || def === "") {
      toast("Please fill all the fields");
    } else {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      axios
        .post("/tasks", {
          title,
          task: details,
          date: now,
          type: def,
          time: `${currentHours}:${currentMinutes}`,
        })
        .then((res) => {
          setnewTask(!newTask);
          settitle("");
          setdetails("");
        });
    }
  };

  const handleCardClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    task: any
  ) => {
    e.stopPropagation();
    navigate(`${task._id}`, { state: setdeleteTask(true) });
  };
  const handleEditTask = (
    e: React.MouseEvent<HTMLButtonElement>,
    task: any
  ) => {
    e.preventDefault();
    axios
      .put(`/tasks/${task._id}`, {
        title: editTitle,
        task: editDetails,
        type: def,
      })
      .then((res) => {
        toast("task updated, close modal");
        setEditted(!editted);
        setEditTitle("");
        //   setTitle(res.data.title);
        setEditDetails("");
      });
  };

  const markAsDone = (task: any) => {
    setBtnLoad(true);
    axios
      .put(`/tasks/${task._id}`, {
        status: "completed",
      })
      .then((res) => {
        setTimeout(() => {
          setBtnLoad(false);
          dispatch(setTask(res.data));
          toast("Task Done", {
            position: "top-right",
          });
        }, 1000);
      })
      .catch((error) => {
        setBtnLoad(false);
        console.error("Error marking task as done:", error);
      });
  };

  const handleDeleteTask = (id: string) => {
    const check = confirm("are you sure you want to delete this task");
    if (check) {
      axios.delete(`/tasks/${id}`).then((res) => {
        settab(!tab);
        toast("task deleted successfully");
      });
    } else {
      toast("task is not deleted");
    }
  };

  return (
    <div
      ref={forwardedRef}
      className="min-h-[70vh] mb-7 shadow-md flex flex-col rounded-lg shadow-slate-800 w-[80%] mx-auto"
    >
      <div className="top-part p-4 flex items-center justify-around">
        <h2 className="h2 hidden lg:block">All Tasks</h2>

        <Input
          placeholder="Search Task"
          spellCheck
          value={searchTask}
          onChange={(e) => setSearchTask(e.target.value)}
          className="border-cyan-800 focus:outline-none outline-none"
          size={5}
        />
        <Popover>
          <PopoverTrigger className="p-2 border border-cyan-800 rounded-lg">
            <FiFilter size={20} className="text-slate-500" />
          </PopoverTrigger>
          <PopoverContent className="w-[60vw] mx-3 py-2 rounded-lg lg:w-[60vw] border-none lg:mr-16 shadow-sm shadow-slate-500 bg-slate-950">
            <select
              onChange={(e: any) => handleDayFilter(e)}
              defaultValue=""
              className="w-4/5 bg-slate-950 border-none p-3 text-slate-400  outline-none"
            >
              <option value="" disabled hidden>
                Date
              </option>
              <option className="p-3 text-sm text-slate-400" value="today">
                Today
              </option>
              <option className="p-3 text-sm text-slate-400" value="seven">
                This Week
              </option>
              <option className="p-3 text-sm text-slate-400" value="thirty">
                This Month
              </option>
            </select>
            <select
              className="w-4/5 bg-slate-950 p-3 border-none text-slate-400 outline-none"
              onChange={handleTypeFilter}
              defaultValue="default"
            >
              <option value="" disabled hidden>
                Type
              </option>
              <option className="p-3 text-sm text-slate-400" value="default">
                Default
              </option>
              <option className="p-3 text-sm text-slate-400" value="workout">
                Workout
              </option>
              <option className="p-3 text-sm text-slate-400" value="study">
                Study
              </option>
              <option className="p-3 text-sm text-slate-400" value="coding">
                Coding
              </option>
              <option className="p-3 text-sm text-slate-400" value="others">
                Others
              </option>
            </select>
            <Button
              variant="outline"
              className="bg-slate-900 hover:bg-slate-800 hover:text-slate-400 border-none text-slate-300"
              onClick={() => {
                toast("Filter has been cleared succesfully", {
                  closeButton: true,
                  className: "bg-slate-950",
                });
                setDayFilter("");
                setTypeFilter("");
              }}
            >
              Clear Filter
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      <Sheet>
        <SheetTrigger className="px-8 py-2 self-center justify-self-center bg-slate-950 text-sm rounded-md font-semibold hover:bg-slate-800/[0.8] border border-slate-400 hover:shadow-lg hover:text-slate-400 ">
          Add Task
        </SheetTrigger>
        <SheetContent
          onSubmit={handleAddTask}
          side="top"
          className="bg-slate-950 text-slate-300"
        >
          <SheetHeader>
            <SheetTitle className="text-slate-200">Add a New Task</SheetTitle>
            <SheetDescription>
              Add a new task now and click the save button to save your upcoming
              task
            </SheetDescription>
          </SheetHeader>
          <form className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">
                Task Title
              </label>
              <Input
                placeholder="Title"
                id="title"
                value={title}
                className="col-span-3"
                onChange={(e) => settitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="details" className="text-right">
                Details
              </label>
              <Input
                placeholder="Details"
                id="details"
                value={details}
                onChange={(e) => setdetails(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <select
                onChange={addTaskType}
                defaultValue=""
                className=" w-32 self-center  md:w-full  md:self-center md:justify-self-center md:ml-[40rem] border border-white h-full bg-slate-950  px-3 py-3 rounded-lg text-slate-400 outline-none"
              >
                <option value="" className=" text-slate-400" disabled hidden>
                  Type
                </option>
                <option className=" text-slate-400" value="default">
                  Default
                </option>
                <option className=" text-slate-400" value="workout">
                  Workout
                </option>
                <option className=" text-slate-400" value="study">
                  Study
                </option>
                <option className=" text-slate-400" value="coding">
                  Coding
                </option>
                <option className=" text-slate-400" value="others">
                  Others
                </option>
              </select>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Quick Add</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
      <Tabs
        onValueChange={() => settab(!tab)}
        defaultValue="Ongoing"
        className="flex items-center justify-center flex-col gap-5"
      >
        <TabsList className="lg:w-4/5 shadow-md shadow-slate-800 w-full px-8  h-14">
          <TabsTrigger className="lg:p-3 " value="Ongoing">
            <div className=" w-1/2">Ongoing</div>
          </TabsTrigger>
          <TabsTrigger value="Completed">
            <div className=" w-1/2">Completed</div>
          </TabsTrigger>
        </TabsList>
        <TabsContent
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 "
          value="Ongoing"
        >
          {filteredTasks.length !== 0 ? (
            filteredTasks.map((task: TaskInterface, index: number) => (
              <div
                key={index}
                className="lg:w-[20rem] pb-3 w-[10rem] mx-auto relative"
              >
                <div className="relative shadow-xl bg-gradient-to-r from-slate-900 to-slate-950 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                  <div
                    className="flex justify-between w-full  flex-col relative min-h-32"
                    onClick={(e: any) => handleCardClick(e, task)}
                  >
                    <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-2 w-2 text-gray-300"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                        />
                      </svg>
                    </div>
                    <h1 className="font-bold text-xl text-white mb-4  ">
                      {task.title.length > 12
                        ? task.title.slice(0, 12).toUpperCase() + "..."
                        : task.title.toUpperCase()}
                    </h1>

                    <p className="font-normal text-base text-slate-500 mb-4 ">
                      {task.task.length > 20
                        ? task.task.slice(0, 30) + "..."
                        : task.task}
                    </p>
                  </div>

                  <div className="flex gap-2 w-full">
                    {btnLoad ? (
                      // Display loading button when loading state is true
                      <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </Button>
                    ) : task.status === "completed" ? (
                      // Display "Done" button if task status is already completed
                      <button className="inline-flex w-1/2 p-2 h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#155e75,45%,#C0C0C0,55%,#155e75)] bg-[length:200%_100%] px-6 font-medium text-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-600 bg-green-600 ">
                        Done
                      </button>
                    ) : (
                      // Display "Mark Done" button if task status is not completed
                      <button
                        onClick={() => markAsDone(task)}
                        className="inline-flex w-1/2 p-2 h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#155e75,45%,#C0C0C0,55%,#155e75)] bg-[length:200%_100%] px-6 font-medium text-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-600 "
                      >
                        Mark Done
                      </button>
                    )}
                    <Sheet>
                      <SheetTrigger asChild>
                        <button className="relative w-1/2 inline-flex h-12 overflow-hidden rounded-xl p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#475569_0%,#475569_50%,#d1d1d1_100%)]" />
                          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                            Edit Task
                          </span>
                        </button>
                      </SheetTrigger>
                      <SheetContent
                        side="bottom"
                        className="bg-slate-950 text-slate-300"
                      >
                        <SheetHeader>
                          <SheetTitle className="text-slate-200">
                            Edit this Task
                          </SheetTitle>
                          <SheetDescription>
                            from title of:{" "}
                            <p className="text-lg font-semibold">
                              {" "}
                              {task.title}
                            </p>
                            <br />
                            objective of: {task.task}
                          </SheetDescription>
                        </SheetHeader>
                        <form className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="title" className="text-right">
                              Task Title
                            </label>
                            <Input
                              placeholder="Title"
                              id="title"
                              value={editTitle}
                              className="col-span-3"
                              onChange={(e) => setEditTitle(e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="details" className="text-right">
                              Details
                            </label>
                            <Input
                              placeholder="Details"
                              id="details"
                              value={editDetails}
                              onChange={(e) => setEditDetails(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                          <SheetFooter>
                            <SheetClose asChild>
                              <Button
                                variant="outline"
                                className="bg-slate-950"
                                onClick={(
                                  e: React.MouseEvent<HTMLButtonElement>
                                ) => {
                                  e.preventDefault();

                                  handleEditTask(e, task);
                                }}
                              >
                                Save changes
                              </Button>
                            </SheetClose>
                          </SheetFooter>
                        </form>
                      </SheetContent>
                    </Sheet>
                  </div>

                  <Meteors number={30} />
                </div>
              </div>
            ))
          ) : (
            <p>no ongoing task</p>
          )}
        </TabsContent>
        <TabsContent
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 "
          value="Completed"
        >
          {complete.length !== 0 ? (
            complete.map((task: TaskInterface, index: number) => (
              <div
                key={index}
                className="lg:w-[20rem] pb-3 w-[10rem] mx-auto relative"
              >
                <div className="relative shadow-xl bg-gradient-to-r from-slate-900 to-slate-950 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                  <div
                    className="flex justify-between w-full  flex-col relative min-h-32"
                    onClick={(e: any) => handleCardClick(e, task)}
                  >
                    <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-2 w-2 text-gray-300"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                        />
                      </svg>
                    </div>
                    <h1 className="font-bold text-xl text-white mb-4  ">
                      {task.title.length > 12
                        ? task.title.slice(0, 12).toUpperCase() + "..."
                        : task.title.toUpperCase()}
                    </h1>

                    <p className="font-normal text-base text-slate-500 mb-4 ">
                      {task.task.length > 20
                        ? task.task.slice(0, 30) + "..."
                        : task.task}
                    </p>
                  </div>

                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => handleDeleteTask(task._id as string)}
                      className="inline-flex w-full p-2 h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#155e75,45%,#C0C0C0,55%,#155e75)] bg-[length:200%_100%] px-6 font-medium text-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-600 bg-green-600 "
                    >
                      Mark to delete
                    </button>
                  </div>

                  <Meteors number={30} />
                </div>
              </div>
            ))
          ) : (
            <p>no task completed</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskContainer;
