import Project from "../Models/Project.js";

// Create project
const createProject = async (req , res) => {
    try {
        const {projectTitle , projectDescription , startDate , endDate , projectStatus , projectPriority , projectMember , projectCreatedBy} = req.body;

        if(!projectTitle || !startDate || !endDate || !projectStatus || !projectPriority || !projectMember){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const today = new Date();
        today.setHours(0 , 0 , 0 , 0);

        const sDate = new Date(startDate);
        sDate.setHours(0 , 0 , 0 , 0);
        
        const eDate = new Date(endDate);
        eDate.setHours(0 , 0 , 0 , 0);

        if(sDate < today){
            return res.status(400).json({
                success: false,
                message: "Start date cannot be in the past",
            });
        }

        if(sDate > eDate){
            return res.status(400).json({
                success: false,
                message: "Start date cannot be after the end date",
            });
        }

        const project = await Project.create({
            projectTitle,
            projectDescription,
            startDate: sDate,
            endDate: eDate,
            projectStatus,
            projectPriority,
            projectMember,
            projectCreatedBy
        })

        return res.status(200).json({
            success: true,
            message: "Project created successfully",
            project,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// Get all projects
const getAllProjects = async (req , res) => {
    try {
        const projects = await Project.find().populate("projectMember" , "name");
        return res.status(200).json({
            success: true,
            message: "Projects fetched successfully",
            projects,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// Get project by id
const getProjectById = async (req , res) => {
    try {
        const {id} = req.params;
        const project = await Project.findById(id);
        return res.status(200).json({
            success: true,
            message: "Project fetched successfully",
            project,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// Update project
const updateProject = async (req , res) => {
    try {
        const {id} = req.params;
        const {projectTitle , projectDescription , startDate , endDate , projectStatus , projectPriority , projectMember} = req.body;

        if(!id){
            return res.status(400).json({
                success: false,
                message: "Project id is required",
            });
        }

        const project = await Project.findByIdAndUpdate(id , {
            projectTitle,
            projectDescription,
            startDate,
            endDate,
            projectStatus,
            projectPriority,
            projectMember
        } , {new: true});

        return res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// Delete project
const deleteProject = async (req , res) => {
    try {
        const {id} = req.params;
        const project = await Project.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Project deleted successfully",
            project,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export {createProject , getAllProjects , getProjectById , updateProject , deleteProject};