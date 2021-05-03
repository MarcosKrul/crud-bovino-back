import { getRepository, Repository } from "typeorm";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import User from "../../models/User";
import AppError from "../../errors/AppError";

interface IParams {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

const generateToken = (user: User) => {
    const token = sign(
        {
            id: user.id,
            date: new Date(),
        }, 
        process.env.JWT_SECRET_KEY || 'default', 
        { expiresIn: '1d' }
    );
    return token;
}

class LoginService {
    public async execute({ email, password }: IParams): Promise<IResponse> {
        const usersRepository: Repository<User> = getRepository(User);

        if (!email || !password) 
            throw new AppError("Por favor, informe e-mail e senha", 400);

        const hasUser = await usersRepository.findOne({
            where: { email }
        });

        if (!hasUser) throw new AppError("Credenciais incorretas", 401);

        const matchPassword = await compare(password, hasUser.password);

        if (!matchPassword) throw new AppError("Credencias incorretas", 401);

        return {
            user: hasUser,
            token: generateToken(hasUser)
        };
    }
}

export default LoginService;