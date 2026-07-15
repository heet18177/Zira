import API from "@/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Add Task
export const addTask = createAsyncThunk("task/addtask", async( data , {rejectWithValue}) =>{
    try {
        const response = await API.post("task/create" , data);
        return response.data;
    } 
    catch (error) {
        return rejectWithValue(error.response.data);
    }
})

// Get All Task
export const getAllTask = createAsyncThunk("task/getalltask", async( _, {rejectWithValue}) => {
    try {
        const response = await API.get("task/all");
        return response.data;
    } 
    catch (error) {
        return rejectWithValue(error.response.data);
    }
})

// Get Task By Project
export const getTaskByProject = createAsyncThunk("task/gettaskbyproject", async( projectId , {rejectWithValue}) => {
    try {
        const response = await API.get(`task/project/${projectId}`);
        return response.data;
    } 
    catch (error) {
        return rejectWithValue(error.response.data);
    }
})

// Get Task By Id
export const getTaskById = createAsyncThunk("task/gettaskbyid", async( id , {rejectWithValue}) => {
    try {
        const response = await API.get(`task/${id}`);
        return response.data;
    } 
    catch (error) {
        return rejectWithValue(error.response.data);
    }
})

// Update Task
export const updateTask = createAsyncThunk("task/updateTask" , async( data , {rejectWithValue}) => {
    try {
        const response = await API.put(`task/update/${data.id}` , data);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
})

// Delete Task
export const deleteTask = createAsyncThunk("task/deleteTask" , async(id , {rejectWithValue}) => {
    try {
        const response = await API.delete(`task/delete/${id}`);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
})
