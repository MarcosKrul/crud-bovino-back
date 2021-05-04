import { Response, Request } from "express";
import { classToClass } from "class-transformer";
import AppError from "../errors/AppError";

import {
    LoginService,
    ResetPasswdService,
    ForgotPasswdService,
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
            const code = error instanceof AppError? error.statusCode : 500;

            return res.status(code).send({
                error: error.message
            })
        }
    }

    public async forgot(req: Request, res: Response): Promise<Response> {
        
        const { email } = req.body;
        
        try {
            const forgotPasswdService = new ForgotPasswdService();

            const response = await forgotPasswdService.execute({
                email
            });

            return res.status(200).send(classToClass(response));
        } catch(error) {
            const code = error instanceof AppError? error.statusCode : 500;

            return res.status(code).send({
                error: error.message
            })
        }
    }

    public async reset(req: Request, res: Response): Promise<Response> {
        
        const { token } = req.params;
        const { email, password } = req.body;
        
        try {
            const resetPasswdService = new ResetPasswdService();

            await resetPasswdService.execute({
                token,
                email,
                password
            });

            return res.status(200).send();
        } catch(error) {
            const code = error instanceof AppError? error.statusCode : 500;

            return res.status(code).send({
                error: error.message
            })
        }
    }
}

export default SessionController;