import { createSlice } from "@reduxjs/toolkit";
import {projects , deleteProjects, editProjects } from "../thunk/projectManage";

const manageProjectSlice = createSlice({
    name : "projects",

    initialState : {
        pro : [],
        loading : false,
        error : null
    },


    extraReducers : (builder)=>{
        // Get All projects
        builder.addCase(projects.pending , (state)=>{
            state.loading = true;
        })
        .addCase(projects.fulfilled , (state,action)=>{
            state.loading = false;
            state.pro = action.payload.projects || [];
        })
        .addCase(projects.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Delete projects
        builder.addCase(deleteProjects.pending , (state)=>{
            state.loading = true;
        })
        .addCase(deleteProjects.fulfilled , (state,action)=>{
            state.loading = false;
            state.pro = state.pro.filter((project)=>project._id !== action.payload._id);
        })
        .addCase(deleteProjects.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Update projects
        builder.addCase(editProjects.pending , (state)=>{
            state.loading = false
        })

        .addCase(editProjects.fulfilled , (state , action)=>{
            state.loading = false;
            state.pro = state.pro.map(pro => pro._id === action.payload._id ? action.payload : pro);   
        })

        .addCase(editProjects.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }

})

export default manageProjectSlice.reducer;