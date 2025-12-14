import Router from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { finalizeMatchController } from '../controllers/matchController.js';
 
const matchRoutes = Router()
matchRoutes.post('/finalize', finalizeMatchController)

export default matchRoutes;