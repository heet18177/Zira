import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskTitle : {
        type : String,
        required : true
    },

    taskDescription : {
        type : String,
        default : ""
    },

    assignTo : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],

    projectId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Project"
    },

    startDateT : {
        type : Date,
        default : Date.now()
    },

    dueDateT : {
        type : Date,
        default : Date.now()
    }, 
    
    taskStatus : {
        type : String,
        enum : ["Pending" , "In Progress" , "Completed"],
        default : "Pending"
    },

    taskPriority : {
        type : String,
        enum : ["High" , "Medium" , "Low"],
        default : "medium"
    },
    
} , { timestamps : true})

const Task = mongoose.model("Task" , taskSchema);
export default Task;