import { Router } from "express";
import UserController from "../controllers/UserController";
import authMiddleware from "../middlewares/ensureUserAuth";

const routes = Router();
const userController = new UserController();


routes.get('/api/users', authMiddleware, userController.index);
routes.post('/api/users', userController.create);


export default routes;