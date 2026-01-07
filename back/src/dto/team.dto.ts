import { object, string, uuid } from 'zod';

export const AddTeamDto = object({
	name: string(),
	userIds: uuid().array(),
});
