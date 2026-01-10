import { Router } from 'express';
import { tounamentRouter } from './tournament.controller';
import { teamRouter } from './teams.controller';
import { authRouter } from './auth.controller';

export const routes = Router();

routes.use('/tournaments', tounamentRouter);
routes.use('/teams', teamRouter);
routes.use('/auth', authRouter);
