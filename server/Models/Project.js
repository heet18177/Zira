import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({

    projectTitle : {
        type : String,
        reqired : true,
    },

    projectDescription : {
        type : String,
        default : ""
    },

    startDate : {
        type : Date,
        default : Date.now()
    },

    endDate : {
        type : Date,
        default : Date.now()
    },

    projectStatus : {
        type : String,
        enum : ["Planning", "In Progress", "Completed", "On Hold"],
        default : "Planning"
    },

    projectPriority : {
        type : String,
        enum : ["High", "Medium", "Low"],
        default : "Medium"
    },

    projectMember : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : false,
        }
    ],
    
    projectCreatedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        // required : true,
    },

} , {timestamps : true})

const Project = mongoose.model("Project" , projectSchema);
export default Project;