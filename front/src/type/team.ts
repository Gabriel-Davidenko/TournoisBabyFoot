import type { User } from './users';

export type Team = {
	id: string;
	name: string;
};

export type AddTeam = { name: string; users: User[] };
