import { Router } from "express";
import BovinoController from "../controllers/BovinoController";
import authMiddleware from "../middlewares/ensureUserAuth";

const routes = Router();
const bovinoController = new BovinoController();


routes.get('/api/bovino', bovinoController.index);
routes.post('/api/bovino', authMiddleware, bovinoController.create);
routes.get('/api/selects', authMiddleware, bovinoController.selects);
routes.put('/api/bovino/:id', authMiddleware, bovinoController.update);
routes.delete('/api/bovino/:id', authMiddleware, bovinoController.delete);


export default routes;