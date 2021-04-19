import express, {
    json,
    Response,
    Request,
    NextFunction,
} from "express";
import cors from "cors";
import "reflect-metadata";
import helmet from "helmet";
import { createConnections } from "typeorm";

import AppError from "./errors/AppError";


createConnections();

const app = express();

app.use(helmet());

app.use(cors());

app.use(json());

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }

    return response.status(500).json({
        static: "error",
        message: "internal server error.",
    });
})

app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.PORT}`);
})