import { Router } from 'express';
import { getContractAnalysis } from '../controllers/clarifyController';

const router = Router();

router.post('/clarify', getContractAnalysis);

export default router;
