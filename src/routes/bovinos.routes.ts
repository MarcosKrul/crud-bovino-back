import { Router } from "express";
import BovinoController from "../controllers/BovinoController";

const routes = Router();
const bovinoController = new BovinoController();


routes.get('/api/bovino', bovinoController.index);
routes.post('/api/bovino', bovinoController.create);
routes.get('/api/selects', bovinoController.selects);
routes.put('/api/bovino/:id', bovinoController.update);
routes.delete('/api/bovino/:id', bovinoController.delete);


export default routes;