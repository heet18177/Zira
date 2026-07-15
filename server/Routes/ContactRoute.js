import express from 'express'
import { createContact } from '../Controllers/ContactController.js';

const contactRouter = express.Router();

contactRouter.post('/create',createContact);

export default contactRouter;