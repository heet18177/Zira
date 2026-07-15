import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import manageProjectReducer from "../slice/fetchSlice";
import taskReducer from "../slice/taskSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    project: manageProjectReducer,
    task: taskReducer,
  },
});

export default store;