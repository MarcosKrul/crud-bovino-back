import { getRepository, Repository, Like, ILike } from "typeorm";
import Bovino from "../../models/Bovino";
import AppError from "../../errors/AppError";

interface IParams {
    nome: string;
    sexo: string;
    raca: string;
    brinco: string;
    situacao: string;
    nascimento: Date;

    brinco_mae?: string;
    brinco_pai?: string;
    
    prenhez?: Date;
    ultimo_parto?: Date;
}

class UpdateBovinoService {
  	public async execute(id: string, data: IParams): Promise<Bovino> {

		const bovinoRepository: Repository<Bovino> = getRepository(Bovino);

        const hasBovino = await bovinoRepository.findOne({
            where: { id }
        })

        if (!hasBovino) throw new AppError("Bovino não encontrado", 404);

        const updated = await bovinoRepository.save({
            id,
            nome: data.nome,
            sexo: data.sexo,
            raca: data.raca,
            situacao: data.situacao,
            nascimento: data.nascimento,
            brinco: data.brinco.toUpperCase(),
            brinco_mae: data.brinco_mae || null,
            brinco_pai: data.brinco_pai || null
        });

        return updated;
  	}
}

export default UpdateBovinoService;