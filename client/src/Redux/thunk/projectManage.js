import API from "@/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Get All Projects
export const projects = createAsyncThunk("projects/all" , async(_ , { rejectWithValue })=>{
   try {
         const result = await API.get('/project/all')
         console.log(result.data)
         return result.data;
   } 
   catch (error) {
        return rejectWithValue(error.response?.data || error.message);
   }

})

// Delete Project
export const deleteProjects = createAsyncThunk("projects/delete" , async(id , { rejectWithValue })=>{
   try {
    const result = await API.delete(`/project/delete/${id}`)
    console.log(result.data)
    return result.data;
   }
   catch(error){
    return rejectWithValue(error.response?.data || error.message);
   }
})

// Edit Project
export const editProjects = createAsyncThunk("projects/edit" , async({id , data} , { rejectWithValue}) => {
   try {
      const result = await API.put(`/project/update/${id}` , data)
      console.log(result.data)
      return result.data;
   } 
   catch (error) {
      return rejectWithValue(error.response?.data || error.message);
   }
})



