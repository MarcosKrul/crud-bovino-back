import { getRepository, Repository, ILike } from "typeorm";
import Bovino from "../../models/Bovino";
import AppError from "../../errors/AppError";

interface IParams {
	page: any;
    limite: any;
	nome?: string;
	brinco?: string;
}

interface IResponse {
    list: Bovino[];
    count: number;
}

class GetBovinosService {
  	public async execute({ page, nome, brinco, limite }: IParams): Promise<IResponse> {

		const bovinoRepository: Repository<Bovino> = getRepository(Bovino);

		if (brinco && nome) throw new AppError("Permitido apenas um filtro", 400);

		if (brinco) {
            const [list, count] = await bovinoRepository.findAndCount({
                where: { brinco: brinco.toUpperCase().replace('-', ' ') },
                order: { nome: "ASC" },
                take: limite,
                skip: limite * page
            })
            return { list, count };
        }
        
        if (nome) {
            const [list, count] = await bovinoRepository.findAndCount({
                where: { nome: ILike(`%${nome.replace('-', ' ')}%`) },
                order: { nome: "ASC" },
                take: limite,
                skip: limite * page
            })
            return { list, count };
        }

        const [list, count] = await bovinoRepository.findAndCount({
            order: { nome: "ASC" },
			take: limite,
			skip: limite * page
		});

		return { list, count };
  	}
}

export default GetBovinosService;