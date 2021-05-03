import { Response, Request } from "express";
import { classToClass } from "class-transformer";

import {
    ListUsersService,
    CreateUserService
} from "../services/userServices";

class UserController {

    public async index(req: Request, res: Response): Promise<Response> {

        try {
            const listUsersService = new ListUsersService();

            const response = await listUsersService.execute();

            return res.status(200).send(classToClass(response));
        } catch(error) {
            return res.status(500).send({
                error: error.message
            })
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {

        const {
            name,
            email,
            password,
            confirmPassword
        } = req.body;
        
        try {
            const createUserService = new CreateUserService();

            const response = await createUserService.execute({
                name,
                email,
                password,
                confirmPassword
            });

            return res.status(200).send(classToClass(response));
        } catch(error) {
            return res.status(500).send({
                error: error.message
            })
        }
    }

}

export default UserController;