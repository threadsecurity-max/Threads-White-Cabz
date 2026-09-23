import { Router } from 'express';
import { getAllRoutes, getRouteBySlug } from '../controllers/route.controller.js';

const router = Router();

router.get('/', getAllRoutes);
router.get('/:slug', getRouteBySlug);

export default router;
