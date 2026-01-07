import { Router } from 'express';
import { AddTeamDto } from '../dto/team.dto';
import { generateBadRequestError, ressourceCreatedResponse } from '../utils/response';
import { appDataSource } from '../datasource';
import { Team } from '../entity/team';
import { User } from '../entity/user.entity';
import { Equal } from 'typeorm';
import { isValidUUID } from '../utils/validation';

export const teamRouter = Router();

teamRouter.post('/', async (req, res) => {
	const addTeamDto = AddTeamDto.safeParse(req.body);

	if (!addTeamDto.success) {
		return generateBadRequestError(res, addTeamDto);
	}
	const { name, userIds } = addTeamDto.data;

	// Map les ids d'user à des objets user
	const userRepository = appDataSource.getRepository(User);

	const users = userIds.map((id) => userRepository.create({ id }));

	//enregistre l'équipe en base de données
	const team = appDataSource.getRepository(Team).save({
		name,
		users,
	});

	return ressourceCreatedResponse(res, team);
});

teamRouter.get('/', async (req, res) => {
	const teams = appDataSource.getRepository(Team).find();

	return res.send(teams);
});
teamRouter.get('/:id', async (req, res) => {
	const { id } = req.params;

	const idDto = isValidUUID(id);
	if (!idDto.success) {
		return res.status(400).send(idDto.error);
	}

	const team = await appDataSource
		.getRepository(Team)
		.findOne({ where: { id: Equal(idDto.data) } });

	return res.send(team);
});
