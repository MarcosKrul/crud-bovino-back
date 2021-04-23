import { getRepository, Repository } from "typeorm";
import Bovino from "../../models/Bovino";
import BovinoFemeas from "../../models/BovinoFemeas";
import AppError from "../../errors/AppError";
import racas from "../../common/racas";
import situacao from "../../common/situacao";

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
        
        
        if (data.nome.length > 20) 
            throw new AppError("Nome possui mais de 20 caracteres", 400);

        if (data.brinco.length > 8) 
            throw new AppError("Brinco possui mais de 8 caracteres", 400);

        if (data.sexo.length > 1 || 
            data.sexo.toUpperCase() !== 'M' &&
            data.sexo.toUpperCase() !== 'F'
        ) 
            throw new AppError("Sexo incorreto", 400);
        
        if (!racas.includes(data.raca)) 
            throw new AppError("Raça indefinida", 400);
        
        if (!situacao.includes(data.situacao)) 
            throw new AppError("Situação indefinida", 400);

        
        if (data.brinco_mae) {
            const hasBovinoMae = await bovinoRepository.findOne({
                where: {
                    sexo: 'F',
                    brinco: data.brinco_mae
                }
            })
            if (!hasBovinoMae) throw new AppError("Bovino mãe não encontrada", 404);
        }

        if (data.brinco_pai) {
            const hasBovinoPai = await bovinoRepository.findOne({
                where: {
                    sexo: 'M',
                    brinco: data.brinco_pai
                }
            })
            if (!hasBovinoPai) throw new AppError("Bovino pai não encontrado", 404);
        }

        
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