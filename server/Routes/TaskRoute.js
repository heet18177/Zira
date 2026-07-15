import express from 'express'
import isAuth from '../Middlewares/Auth.js';
import checkRole from '../Middlewares/Role.js';
import { createTask , getAllTask , getTaskById , updateTask , deleteTask, getTasksByProjectId} from '../Controllers/TaskController.js';

const taskRouter = express.Router();

taskRouter.post('/create' , isAuth , checkRole("admin" , "manager") , createTask);
taskRouter.get('/all' , isAuth , checkRole("admin" , "manager" , "employee") , getAllTask);
taskRouter.get('/project/:projectId' , isAuth , checkRole("admin" , "manager" , "employee") , getTasksByProjectId);
taskRouter.get('/:id' , isAuth , checkRole("admin" , "manager" , "employee") , getTaskById);
taskRouter.put('/update/:id' , isAuth , checkRole("admin" , "manager" , "employee") , updateTask);
taskRouter.delete('/delete/:id' , isAuth , checkRole("admin") , deleteTask);

export default taskRouter;