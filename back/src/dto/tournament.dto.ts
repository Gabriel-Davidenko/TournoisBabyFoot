import { iso, object, string } from 'zod';
export const TournamentDto = object({
	name: string(),
	description: string(),
	date: iso.datetime(),
});
