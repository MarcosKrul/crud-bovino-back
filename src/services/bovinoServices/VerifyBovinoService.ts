import { getRepository, Repository, ILike } from "typeorm";
import Bovino from "../../models/Bovino";
import AppError from "../../errors/AppError";
import racas from "../../common/racas";
import situacao from "../../common/situacao";

interface IParams {
    raca: string;
    nome: string;
    sexo: string;
    brinco: string;
    situacao: string;
    brinco_mae: string;
    brinco_pai: string;
}

class VerifyBovinoService {
  	public async execute(bovino: IParams): Promise<boolean> {

		const bovinoRepository: Repository<Bovino> = getRepository(Bovino);

		if (bovino.nome.length > 20) 
            throw new AppError("Nome possui mais de 20 caracteres", 400);

        if (bovino.brinco.length > 8) 
            throw new AppError("Brinco possui mais de 8 caracteres", 400);

        if (bovino.sexo.length > 1 || 
            bovino.sexo.toUpperCase() !== 'M' &&
            bovino.sexo.toUpperCase() !== 'F'
        ) 
            throw new AppError("Sexo incorreto", 400);
        
        if (!racas.includes(bovino.raca)) 
            throw new AppError("Raça indefinida", 400);
        
        if (!situacao.includes(bovino.situacao)) 
            throw new AppError("Situação indefinida", 400);

        
        if (bovino.brinco_mae) {
            const hasBovinoMae = await bovinoRepository.findOne({
                where: {
                    sexo: 'F',
                    brinco: bovino.brinco_mae
                }
            })
            if (!hasBovinoMae) throw new AppError("Bovino mãe não encontrada", 404);
        }

        if (bovino.brinco_pai) {
            const hasBovinoPai = await bovinoRepository.findOne({
                where: {
                    sexo: 'M',
                    brinco: bovino.brinco_pai
                }
            })
            if (!hasBovinoPai) throw new AppError("Bovino pai não encontrado", 404);
        }

        return true;
  	}
}

export default VerifyBovinoService;