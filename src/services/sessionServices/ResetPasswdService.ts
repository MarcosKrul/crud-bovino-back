import { getRepository, Repository } from "typeorm";
import { hash } from "bcrypt";
import User from "../../models/User";
import AppError from "../../errors/AppError";
import ForgotPasswd from "../../models/ForgotPasswd";

interface IParams {
    email: string;
    token: string;
    password: string;
}

class ResetPasswdService {
    public async execute({ email, password, token }: IParams): Promise<void> {
        const usersRepository: Repository<User> = getRepository(User);
        const forgotRepository: Repository<ForgotPasswd> = getRepository(ForgotPasswd);

        const hasUser = await usersRepository.findOne({
            where: { email }
        });

        if (!hasUser) throw new AppError("E-mail não cadastrado", 401);

        const hasRequest = await forgotRepository.findOne({
            where: { user_id: hasUser.id }
        });

        if (!hasRequest) throw new AppError("Usuário não possui acesso à troca", 401);

        const now = new Date();

        if (now > new Date(hasRequest.expiresIn) || token !== hasRequest.token)
            throw new AppError("Acesso à troca de senha inválido", 401);
        

        await usersRepository.update(hasUser.id, {
            password: await hash(password, 11)
        });

        await forgotRepository.delete(hasRequest);
    }
}

export default ResetPasswdService;