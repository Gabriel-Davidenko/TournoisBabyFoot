import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from './config/config';
import { Tournament } from './entity/tournament.entity';
import { Team } from './entity/team';
import { User } from './entity/user.entity';

export const appDataSource = new DataSource({
	type: 'postgres',
	host: 'postgres',
	port: 5432,
	username: config.POSTGRES_USER,
	password: config.POSTGRES_PASSWORD,
	database: config.POSTGRES_DB,
	entities: [Tournament, Team, User],
	synchronize: true,
	logging: false,
});
