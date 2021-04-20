import { Response, Request } from "express";
import { classToClass } from "class-transformer";

import {
    GetBovinosService,
} from "../services/bovinoServices";

class BovinoController {
    public async index(req: Request, res: Response): Promise<Response> {

        const { page=0, nome, brinco } = req.query;

        try {
            const getBovinosService = new GetBovinosService();

            const response = await getBovinosService.execute({ 
                page, 
                nome: nome?.toString(), 
                brinco: brinco?.toString()
            });

            return res.status(200).send(classToClass(response));
        } catch(error) {
            return res.status(500).send({
                error: error.message
            })
        }
    }

}

export default BovinoController;