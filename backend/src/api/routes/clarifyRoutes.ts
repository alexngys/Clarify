import { Router } from 'express';
import { getContractAnalysis, convertToSolidity } from '../controllers/clarifyController';

const router = Router();

router.post('/clarify', getContractAnalysis);
router.post('/convertToSolidity', convertToSolidity)

export default router;
