import { Router } from "express";
import bovinoRoutes from "./bovinos.routes";

const routes = Router();

routes.use(bovinoRoutes);

export default routes;