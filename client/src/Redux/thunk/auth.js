import API from "@/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const login = createAsyncThunk("auth/login" , 
    async(data , {rejectWithValue})=>{
        try {
            const result = await API.post('/auth/login' , data , {withCredentials : true});
            console.log(result.data)
            return result.data

        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error)
        }
    })

const register = createAsyncThunk("auth/register" , 
    async(data , {rejectWithValue}) => {
        try{
            const result = await API.post('/auth/register' , data , {withCredentials : true});
            console.log(result.data)
            return result.data
        }
        catch(error){
            console.log(error.message);
            return rejectWithValue(error)
        }
    }
)

const getCurrentUser = createAsyncThunk("auth/getme" , 
    async(_ , {rejectWithValue}) => {
        try{
            const result = await API.get('/auth/getme');
            console.log(result.data)
            return result.data
        }
        catch(error){
            console.log(error.message);
            return rejectWithValue({
      message: error.response?.data?.message || error.message,
      status: error.response?.status
    })
        }
    }
)

    export {login , register , getCurrentUser}