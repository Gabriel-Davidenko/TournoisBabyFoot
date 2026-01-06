import { Response } from 'express';
import { ZodSafeParseResult } from 'zod';

export function generateBadRequestError(
	res: Response,
	safeParseResult: ZodSafeParseResult<unknown>,
) {
	return res.status(400).send(safeParseResult.error);
}

export function ressourceCreatedResponse(res: Response, createdRessource: unknown) {
	return res.status(201).send(createdRessource);
}
