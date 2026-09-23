import { Router } from 'express';
import { getAllServices, getServiceBySlug } from '../controllers/service.controller.js';

const router = Router();

router.get('/', getAllServices);
router.get('/:slug', getServiceBySlug);

export default router;
