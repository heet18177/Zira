import Task from "../Models/Task.js";

// Create Task
const createTask  = async (req , res) => {
    try {
        const {taskTitle , taskDescription , assignTo , projectId , startDateT , dueDateT , taskStatus , taskPriority} = req.body;

        if(!taskTitle || !taskDescription || !assignTo || assignTo.length === 0 || !projectId || !startDateT || !dueDateT || !taskStatus || !taskPriority){
            return res.status(400).json({
                success : false,
                message : "All fields are required",
            });
        }

        const today = new Date();
        today.setHours(0 , 0 , 0 , 0);

        const sDate = new Date(startDateT);
        sDate.setHours(0 , 0 , 0 , 0);

        const dDate = new Date(dueDateT);
        dDate.setHours(0 , 0 , 0 , 0);

        if(sDate < today){
            return res.status(400).json({
                success : false,
                message : "Start date cannot be in the past",
            });
        }

        if(sDate > dDate){
            return res.status(400).json({
                success : false,
                message : "Start date cannot be after the end date",
            });
        }

        const task = await Task.create({
            taskTitle,
            taskDescription,
            assignTo,
            projectId,
            startDateT: sDate,
            dueDateT: dDate,
            taskStatus,
            taskPriority
        });

        return res.status(200).json({
            success : true,
            message : "Task created successfully",
            task
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}

// get all task
const getAllTask = async (req , res) => {
    try {
        const task = await Task.find().populate("assignTo" , "name");
        return res.status(200).json({
            success : true,
            message : "Task fetched successfully",
            task
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}

// Get single task by id
const getTaskById = async (req , res) => {
    try {
        const {id} = req.params;

        if(!id){
            return res.status(400).json({
                success : false,
                message : "Task id is required",
            });
        }

        const task = await Task.findById(id);
        return res.status(200).json({
            success : true,
            message : "Task fetched successfully",
            task
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}

// Update task by id
// const updateTask = async (req , res) => {
//     try {
//         const {id} = req.params;
        
//         const {taskTitle , taskDescription , assignTo , projectId , startDateT , dueDateT , taskStatus , taskPriority} = req.body;

//         if(!id){
//             return res.status(400).json({
//                 success : false,
//                 message : "Task id is required",
//             });
//         }

//         const task = await Task.findByIdAndUpdate(id , {
//             taskTitle,
//             taskDescription,
//             assignTo,
//             projectId,
//             startDateT,
//             dueDateT,
//             taskStatus,
//             taskPriority
//         } , {new: true});

//         return res.status(200).json({
//             success : true,
//             message : "Task updated successfully",
//             task
//         });
//     } 
//     catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success : false,
//             message : error.message,
//         })
//     }
// }

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Employee: only status update
    if (user.role === "employee") {
      task.taskStatus = req.body.taskStatus;

      await task.save();

      return res.status(200).json({
        success: true,
        message: "Status updated successfully",
        task,
      });
    }

    // Admin/Manager: update everything
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete task by id
const deleteTask = async (req , res) => {
    try {
        const {id} = req.params;

        if(!id){
            return res.status(400).json({
                success : false,
                message : "Task id is required",
            });
        }

        const task = await Task.findByIdAndDelete(id);
        return res.status(200).json({
            success : true,
            message : "Task deleted successfully",
            task
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}

// Get tasks by project id
const getTasksByProjectId = async (req, res) => {
    try {
        const { projectId } = req.params;

        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: "Project id is required",
            });
        }

        const tasks = await Task.find({ projectId }).populate("assignTo", "name");
        return res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            tasks
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export {createTask , getAllTask , getTaskById , updateTask , deleteTask, getTasksByProjectId};