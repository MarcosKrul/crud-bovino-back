import { getRepository, Repository } from "typeorm";
import { hash } from "bcrypt";
import { validate } from "email-validator";
import User from "../../models/User";
import AppError from "../../errors/AppError";

interface IParams {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

class CreateUserService {
    public async execute(data: IParams): Promise<User> {
        
        const usersRepository: Repository<User> = getRepository(User);

        const hasUser = await usersRepository.findOne({
            where: { email: data.email }
        });

        if(hasUser) throw new AppError("E-mail já cadastrado", 409);
        
        if (!validate(data.email))
            throw new AppError("E-mail inválido", 400);

        if (data.name.length > 64) 
            throw new AppError("Nome possui mais de 64 caracteres", 400);

        if (data.email.length > 64) 
            throw new AppError("E-mail possui mais de 64 caracteres", 400);

        if (data.password !== data.confirmPassword)
            throw new AppError("Senhas diferentes", 400);


        const user = usersRepository.create({
            name: data.name,
            email: data.email,
            password: await hash(data.password, 11)
        });
        
        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;