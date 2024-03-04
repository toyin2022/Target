import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  userId: string;
  type: "default" | "workout" | "study" | "others" | "coding";
  status: "pending" | "completed";
  title: string;
  task: string;
  isImportant: boolean;
  date: Date;
  time: string;
}

export interface TaskSlice {
  tasks: Task[];
  task: Task | null;
}

const initialState: TaskSlice = {
  tasks: [],
  task: null,
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = [...action.payload];
    },

    setTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
    },
  },
});

export const { setTasks, setTask } = taskSlice.actions;

export default taskSlice.reducer;
