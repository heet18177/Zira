import { getCurrentUser, login, register } from "../thunk/auth";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "user",
    initialState : {
        user : null,
        isLoading : true,
        token : null,
        error : null
    },

    reducers:{
        logout : (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            state.isLoading = false;
        }
    },

    extraReducers : (builder) => {
        // For Login
        builder.addCase(login.pending , (state)=>{
            state.isLoading = true;
            state.error = null;
        })

        .addCase(login.fulfilled , (state , action)=>{
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token
        })

        .addCase(login.rejected , (state , action)=>{
            state.isLoading = false;
            state.error = action.payload
        })

        // For register
        builder.addCase(register.pending , (state)=>{
            state.isLoading = true;
            state.error = null;
        })

        .addCase(register.fulfilled , (state , action)=>{
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token
        })

        .addCase(register.rejected , (state , action)=>{
            state.isLoading = false;
            state.error = action.payload || action.error.message;
        })

        // For Get Current User
        builder.addCase(getCurrentUser.pending , (state)=>{
            state.isLoading = true;
            state.error = null;
        })

        .addCase(getCurrentUser.fulfilled , (state , action)=>{
            state.isLoading = false;    
            state.user = action.payload.user;
        })

        .addCase(getCurrentUser.rejected , (state , action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export const {logout} = authSlice.actions;
export default authSlice.reducer