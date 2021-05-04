import { getRepository, Repository } from "typeorm";
import User from "../../models/User";
import mail from "../../config/mail";
import { createTransport } from "nodemailer";
import AppError from "../../errors/AppError";

interface IParams {
    email: string;
}

class ThrowResetPasswdMailService {
    public async execute({ email }: IParams): Promise<void>{
        const usersRepository: Repository<User> = getRepository(User);

        const hasUser = await usersRepository.findOne({
            where: { email },
            relations: ['forgotPasswd']
        });

        if (!hasUser) throw new AppError("Usuário não cadastrado", 404);

        const transporter = createTransport({
            host: mail.host,
            port: mail.port,
            secure: true,
            auth: {
                user: mail.user,
                pass: mail.password,
            }
        });

        const link = `
            ${process.env.APP_ENV === "development" 
                ? process.env.LOCAL_WEB_URL 
                : process.env.DEPLOY_WEB_URL
            }/auth/reset/${hasUser.forgotPasswd.token}`;

        const mailConfig = {
            from: mail.user,
            to: email,
            subject: "Recuperação de senha",
            text: `
                Olá, ${hasUser.name}!\n
                Para redefinição de senha, acesse o link: ${link}
            `,
            html: `
                <p>
                    Olá, ${hasUser.name} <br/>
                    Para redefinição de senha, acesse o link: <br/>
                    <a href="${link}">Redefinir senha</a>
                </p>
            `
        };

        transporter.sendMail(mailConfig);
    }
}

export default ThrowResetPasswdMailService;