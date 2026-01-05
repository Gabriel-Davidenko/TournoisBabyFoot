import { Router } from 'express';
import tounamentRouter from './tournament.controller';

const routes = Router();

routes.use('/tournaments', tounamentRouter);

export default routes;
