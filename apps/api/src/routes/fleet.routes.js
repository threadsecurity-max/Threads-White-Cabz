import { Router } from 'express';
import { getFleet } from '../controllers/fleet.controller.js';

const router = Router();

router.get('/', getFleet);

export default router;
