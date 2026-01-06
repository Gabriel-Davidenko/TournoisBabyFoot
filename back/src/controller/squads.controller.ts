import { Router } from 'express';
import { AddSquadDto } from '../dto/squad.dto';
import { generateBadRequestError, ressourceCreated } from '../utils/response';
import { appDataSource } from '../datasource';
import { Squad } from '../entity/squad';
import { User } from '../entity/user.entity';

export const squadController = Router();

squadController.post('/', async (req, res) => {
	const addSquadDto = AddSquadDto.safeParse(req.body);

	if (!addSquadDto.success) {
		return generateBadRequestError(res, addSquadDto);
	}
	const { name, userIds } = addSquadDto.data;

	// Map les ids d'user à des objets user
	const userRepository = appDataSource.getRepository(User);

	const users = userIds.map((id) => userRepository.create({ id }));

	//enregistre l'équipe en base de données
	const squad = appDataSource.getRepository(Squad).save({
		name,
		users,
	});

	return ressourceCreated(res, squad);
});

squadController.get('/', async (req, res) => {
	const squads = appDataSource.getRepository(Squad).find();

	return res.send(squads);
});
