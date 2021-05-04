import { getRepository, Repository } from "typeorm";
import { randomBytes } from "crypto";
import User from "../../models/User";
import AppError from "../../errors/AppError";
import ForgotPasswd from "../../models/ForgotPasswd";

interface IParams {
    email: string;
}

class ForgotPasswdService {
    public async execute({ email }: IParams): Promise<void> {
        const usersRepository: Repository<User> = getRepository(User);
        const forgotRepository: Repository<ForgotPasswd> = getRepository(ForgotPasswd);

        const hasUser = await usersRepository.findOne({
            where: { email }
        });

        if (!hasUser) throw new AppError("E-mail não cadastrado", 401);

        const now = new Date();
        now.setHours(now.getHours() + 1);
        const token = randomBytes(20).toString('hex');

        await forgotRepository.save({
            token,
            expiresIn: now,
            user_id: hasUser.id
        });
    }
}

export default ForgotPasswdService;