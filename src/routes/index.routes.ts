import { Router } from "express";
import userRoutes from "./users.routes";
import bovinoRoutes from "./bovinos.routes";

const routes = Router();

routes.use(userRoutes);
routes.use(bovinoRoutes);

export default routes;