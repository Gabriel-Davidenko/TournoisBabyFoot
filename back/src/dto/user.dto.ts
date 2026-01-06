import { object, string } from 'zod';

export const AddUserDto = object({
	username: string(),
	password: string(),
	name: string(),
});
