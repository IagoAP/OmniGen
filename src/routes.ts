import express from 'express';

import CanalController from './controllers/CanalController'
import FormasPagController from './controllers/FormasPagController'

const routes = express.Router();

const canalController = new CanalController();
const formasPagController = new FormasPagController();

routes.get('/formasPag', formasPagController.index);

routes.get('/canais/:id', canalController.show);

export default routes;