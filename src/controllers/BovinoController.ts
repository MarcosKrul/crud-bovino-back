import { Response, Request } from "express";
import { classToClass } from "class-transformer";

import {
    GetBovinosService,
    CreateBovinoService,
    DeleteBovinoService,
    UpdateBovinoService,
} from "../services/bovinoServices";

import racas from "../common/racas";
import situacao from "../common/situacao";

class BovinoController {
    public async index(req: Request, res: Response): Promise<Response> {

        const { page=0, nome, brinco, limite=5 } = req.query;

        try {
            const getBovinosService = new GetBovinosService();

            const response = await getBovinosService.execute({ 
                page, 
                limite,
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

    public async selects(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(200).send({
                racas,
                situacoes: situacao
            });
        } catch(error) {
            return res.status(500).send({
                error: error.message
            })
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {

        const {
            nome,
            sexo,
            raca,
            brinco,
            prenhez,
            situacao,
            nascimento,
            brinco_mae,
            brinco_pai,
            ultimo_parto,
        } = req.body;
        
        try {
            const createBovinoService = new CreateBovinoService();

            const response = await createBovinoService.execute({
                nome,
                sexo,
                raca,
                brinco,
                prenhez, 
                situacao,
                nascimento,
                brinco_mae,
                brinco_pai,
                ultimo_parto
            });

            return res.status(200).send(response);
        } catch(error) {
            return res.status(500).send({
                error: error.message
            })
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {

        const { id } = req.params;
        const {
            nome,
            sexo,
            raca,
            brinco,
            prenhez,
            situacao,
            nascimento,
            brinco_mae,
            brinco_pai,
            ultimo_parto,
        } = req.body;

        try {
            const updateBovinoService = new UpdateBovinoService();

            await updateBovinoService.execute(id, {
                nome,
                sexo,
                raca,
                brinco,
                prenhez, 
                situacao,
                nascimento,
                brinco_mae,
                brinco_pai,
                ultimo_parto
            });

            return res.status(200).send();
        } catch(error) {
            return res.status(500).send({
                error: error.message
            })
        }
    }
    
    public async delete(req: Request, res: Response): Promise<Response> {

        const { id } = req.params;

        try {
            const deleteBovinoService = new DeleteBovinoService();

            await deleteBovinoService.execute({ id });

            return res.status(200).send();
        } catch(error) {
            return res.status(500).send({
                error: error.message
            })
        }
    }

}

export default BovinoController;