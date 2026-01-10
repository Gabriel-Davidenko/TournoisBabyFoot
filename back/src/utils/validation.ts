import { uuid, ZodSafeParseResult } from 'zod';

export function isValidUUID(str: string): ZodSafeParseResult<string> {
	return uuid().safeParse(str);
}
