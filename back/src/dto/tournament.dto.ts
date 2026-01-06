import { iso, object, string } from 'zod';
export const AddTournamentDto = object({
	name: string(),
	description: string(),
	date: iso.datetime(),
});
