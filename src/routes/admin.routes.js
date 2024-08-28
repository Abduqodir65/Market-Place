import { Router } from "express";
import AdminController from '../controllers/admin.controller.js';

const adminRouter = Router();

adminRouter.post('/add', AdminController.addAdmin);
adminRouter.post('/signin',AdminController.signin)

export default adminRouter;
