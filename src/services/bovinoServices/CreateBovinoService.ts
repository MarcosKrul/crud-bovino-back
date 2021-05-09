import { getRepository, Repository } from "typeorm";
import Bovino from "../../models/Bovino";
import BovinoFemeas from "../../models/BovinoFemeas";
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

interface IResponse {
    bovino: Bovino;
    femea: BovinoFemeas | null;
}

class CreateBovinoService {
    public async execute(data: IParams): Promise<IResponse> {
        
        const bovinoRepository: Repository<Bovino> = getRepository(Bovino);

        const hasBovino = await bovinoRepository.findOne({
            where: { brinco: data.brinco }
        });

        if(hasBovino) throw new AppError("Brinco já cadastrado", 409);
        
        
        const bovino = bovinoRepository.create({
            nome: data.nome,
            raca: data.raca,
            situacao: data.situacao,
            nascimento: data.nascimento,
            sexo: data.sexo.toUpperCase(),
            brinco: data.brinco.toUpperCase(),
            brinco_mae: data.brinco_mae || null,
            brinco_pai: data.brinco_pai || null
        });
        
        const save = await bovinoRepository.save(bovino);


        let saveFemea = null;
        if (data.sexo.toLocaleLowerCase() === 'f') {
            const bovinoFemeasRepository: Repository<BovinoFemeas> = getRepository(BovinoFemeas);

            const femea = bovinoFemeasRepository.create({
                id: save.id,
                prenhez: data.prenhez || null,
                ultimo_parto: data.ultimo_parto || null
            })

            saveFemea = await bovinoFemeasRepository.save(femea);
        }

        return {
            bovino: save,
            femea: saveFemea || null
        };
    }
}

export default CreateBovinoService;