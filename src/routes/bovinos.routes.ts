import { Router } from "express";
import BovinoController from "../controllers/BovinoController";

const routes = Router();
const bovinoController = new BovinoController();


routes.get('/api/bovino', bovinoController.index);


export default routes;