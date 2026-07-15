import express from 'express'
import { register , login , logout , getAllUsers, getCurrentUser } from '../Controllers/UserController.js';
import isAuth from '../Middlewares/Auth.js';

const router = express.Router();

router.post("/register" , register);
router.post("/login" , login);
router.post("/logout" , logout);
router.get("/all" , getAllUsers);
router.get("/getme" , isAuth, getCurrentUser);

export default router;