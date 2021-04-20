import { Router } from "express";
import BovinoController from "../controllers/BovinoController";

const routes = Router();
const bovinoController = new BovinoController();


routes.get('/api/bovino', bovinoController.index);
routes.post('/api/bovino', bovinoController.create);
routes.put('/api/bovino/:id', bovinoController.update);


export default routes;