import { object, string, uuid } from 'zod';

export const AddSquadDto = object({
	name: string(),
	userIds: uuid().array(),
});
