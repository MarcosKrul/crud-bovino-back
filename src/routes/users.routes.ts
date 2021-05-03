import { Router } from "express";
import UserController from "../controllers/UserController";

const routes = Router();
const userController = new UserController();


routes.get('/api/users', userController.index);
routes.post('/api/users', userController.create);


export default routes;