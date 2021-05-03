import { Response, Request } from "express";
import { classToClass } from "class-transformer";

import {
    LoginService,
} from "../services/sessionServices";

class SessionController {

    public async login(req: Request, res: Response): Promise<Response> {
        
        const { email, password } = req.body;
        
        try {
            const loginService = new LoginService();

            const response = await loginService.execute({
                email,
                password
            });

            return res.status(200).send(classToClass(response));
        } catch(error) {
            return res.status(500).send({
                error: error.message
            })
        }
    }
}

export default SessionController;