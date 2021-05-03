import { Router } from "express";
import userRoutes from "./users.routes";
import bovinoRoutes from "./bovinos.routes";
import sessionRoutes from "./session.routes";

const routes = Router();

routes.use(userRoutes);
routes.use(bovinoRoutes);
routes.use(sessionRoutes);

export default routes;