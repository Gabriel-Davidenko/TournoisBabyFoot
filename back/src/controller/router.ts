import { Router } from 'express';
import { tounamentRouter } from './tournament.controller';

export const routes = Router();

routes.use('/tournaments', tounamentRouter);
