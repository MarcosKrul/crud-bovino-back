import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from "../errors/AppError";

interface ITokenPayload {
    id: string;
    date: Date;
	iat: number;
	exp: number;
}

export default function ensureUserAuth (
	req: Request,
	res: Response,
	next: NextFunction
): void | Response<any, Record<string, any>> {

	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({error: "JTW token is missed."})
	}

  const [, token] = authHeader.split(' ');

	try {
		const decoded = verify(token, process.env.JWT_SECRET_KEY || '');

		const { id } = decoded as ITokenPayload;

		Object.assign(req, {user : { id: id }});

		return next();
	} catch (err) {
		throw new AppError("Invalid JWT token", 401);
	}
}