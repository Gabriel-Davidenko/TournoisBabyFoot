import { Router } from 'express';
import { tounamentRouter } from './tournament.controller';
import { squadRouter } from './squads.controller';
import { authRouter } from './auth.controller';

export const routes = Router();

routes.use('/tournaments', tounamentRouter);
routes.use('/squads', squadRouter);
routes.use('/auth', authRouter);
