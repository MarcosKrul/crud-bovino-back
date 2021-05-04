import { Router } from "express";
import SessionController from "../controllers/SessionController";

const routes = Router();
const sessionController = new SessionController();


routes.post('/api/session/login', sessionController.login);
routes.post('/api/session/forgot', sessionController.forgot);
routes.post('/api/session/reset/:token', sessionController.reset);


export default routes;