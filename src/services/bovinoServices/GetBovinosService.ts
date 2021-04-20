import { getRepository, Repository, Like, ILike } from "typeorm";
import Bovino from "../../models/Bovino";
import AppError from "../../errors/AppError";

interface IParams {
	page: any;
	nome?: string;
	brinco?: string;
}

class GetBovinosService {
  	public async execute({ page, nome, brinco }: IParams): Promise<Bovino[]> {

		const bovinoRepository: Repository<Bovino> = getRepository(Bovino);

		if (brinco && nome) throw new AppError("Permitido apenas um filtro", 400);

		if (brinco) {
            const bovinosBrinco = await bovinoRepository.find({
                where: { brinco: Like(`%${brinco.toUpperCase()}%`) },
                take: 15,
                skip: 15 * page
            })
            return bovinosBrinco;
        }
        
        if (nome) {
            const bovinosNome = await bovinoRepository.find({
                where: { nome: ILike(`%${nome.replace('-', ' ')}%`) },
                take: 15,
                skip: 15 * page
            })
            return bovinosNome;
        }

		const bovinos = await bovinoRepository.find({
			take: 15,
			skip: 15 * page
		});

		return bovinos;
  	}
}

export default GetBovinosService;