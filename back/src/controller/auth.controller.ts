import { Router } from 'express';
import { genSalt, hash } from 'bcrypt';
import { appDataSource } from '../datasource';
import { User } from '../entity/user.entity';
import { AddUserDto } from '../dto/user.dto';
import { generateBadRequestError, ressourceCreatedResponse } from '../utils/response';

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
	const authDto = AddUserDto.safeParse(req.body);
	if (!authDto.success) {
		return generateBadRequestError(res, authDto);
	}
	const { name, password, username } = authDto.data;
	const salt = await genSalt();
	const hashedPassword = await hash(password, salt);

	const user = await appDataSource
		.getRepository(User)
		.save({ password: hashedPassword, salt, username, name });

	return ressourceCreatedResponse(res, { id: user.id, name: user.name });
});
