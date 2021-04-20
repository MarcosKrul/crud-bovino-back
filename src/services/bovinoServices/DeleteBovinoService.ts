import { getRepository, Repository } from "typeorm";
import Bovino from "../../models/Bovino";
import AppError from "../../errors/AppError";

interface IParams {
    id: string;
}

class DeleteBovinoService {
    public async execute({ id }: IParams): Promise<void> {

        const bovinoRepository: Repository<Bovino> = getRepository(Bovino);

        const bovino = await bovinoRepository.findOne({
            where: { id }
        });

        if (!bovino) throw new AppError("Bovino não encontrado", 404);

        await bovinoRepository.delete(bovino);
    }
}

export default DeleteBovinoService;