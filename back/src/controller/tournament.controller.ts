import { Router } from 'express';
import { appDataSource } from '../datasource';
import { StatusEnum, Tournament } from '../entity/tournament.entity';
import { AddTournamentDto } from '../dto/tournament.dto';
import { randomUUID } from 'node:crypto';
import { Equal } from 'typeorm';
import { safeParse, uuid } from 'zod';
import { isValidUUID } from '../utils/validation';

const tounamentRouter = Router();

// Route pour ajouter un tournoi
tounamentRouter.post('/', async (req, res) => {
	const tournamentDto = AddTournamentDto.safeParse(req.body);

	if (!tournamentDto.success) {
		return res.status(400).send(tournamentDto.error);
	}

	const repository = appDataSource.getRepository(Tournament);
	const tournament = repository.create({
		...tournamentDto.data,
		status: StatusEnum.PENDING,
		createdBy: randomUUID(), // TODO a changer une fois qu'on a la gestion des users
	});
	const savedTournament = await repository.save(tournament);

	return res.send(savedTournament.id);
});

// Route pour récupérer tous les tournois
tounamentRouter.get('/', async (req, res) => {
	const tournaments = await appDataSource.getRepository(Tournament).find({
		select: {
			id: true,
			name: true,
			date: true,
			status: true,
		},
	});
	return res.send(tournaments);
});

// Route pour récupérer un seul tournois
tounamentRouter.get('/:id', async (req, res) => {
	const { id } = req.params;

	const idDto = isValidUUID(id);
	if (!idDto.success) {
		return res.status(400).send(idDto.error);
	}

	const tournament = await appDataSource.getRepository(Tournament).findOne({
		where: { id: Equal(id) },
	});
	return res.send(tournament);
});

export default tounamentRouter;
