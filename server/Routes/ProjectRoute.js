import express from "express";
import { createProject , getAllProjects , getProjectById , updateProject , deleteProject } from "../Controllers/ProjectController.js";
import isAuth from "../Middlewares/Auth.js";
import checkRole from "../Middlewares/Role.js";

const projectRouter = express.Router();

projectRouter.post("/create" , isAuth , checkRole("admin" , "manager") , createProject);                            // Create a new project
projectRouter.get("/all" , isAuth , checkRole("admin" , "manager" , "employee") , getAllProjects);                // Get all projects
projectRouter.get("/:id" , isAuth , checkRole("admin" , "manager" , "employee") , getProjectById);                // Get a single project
projectRouter.put("/update/:id" , isAuth , checkRole("admin" , "manager") , updateProject);                        // Update a project
projectRouter.delete("/delete/:id" , isAuth , checkRole("admin") , deleteProject);                               // Delete a project

export default projectRouter;