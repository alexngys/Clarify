import { Router } from 'express';
import { getContractAnalysis, convertToSolidity, convertToClarity } from '../controllers/clarifyController';

const router = Router();

router.post('/clarify', getContractAnalysis);
router.post('/convertToSolidity', convertToSolidity)
// router.post('/deploy', deployClarityContract)
router.post('/convertToClarity', convertToClarity)

export default router;
