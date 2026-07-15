import { createSlice } from "@reduxjs/toolkit";
import {
  addTask,
  deleteTask,
  getAllTask,
  getTaskById,
  getTaskByProject,
  updateTask,
} from "../thunk/taskManage";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    loading: false,
    error: null,
    task: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    // Add Task
    builder
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })

      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task.push(action.payload.task);
      })

      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get All Task
    builder
      .addCase(getAllTask.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload.task;
      })

      .addCase(getAllTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Task By Project
    builder
      .addCase(getTaskByProject.pending, (state) => {
        state.loading = true;
      })

      .addCase(getTaskByProject.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload.tasks;
      })

      .addCase(getTaskByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Task By Id
    builder
      .addCase(getTaskById.pending, (state) => {
        state.loading = true;
      })

      .addCase(getTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload.task;
      })

      .addCase(getTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Task
    builder
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;

        if (Array.isArray(state.task)) {
          state.task = state.task.map((task) =>
            task._id === action.payload.task._id ? action.payload.task : task,
          );
        } else {
          state.task = action.payload.task;
        }
      })

      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Task
    builder
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = state.task.filter(
          (task) => task._id !== action.payload.task._id,
        );
      })

      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
