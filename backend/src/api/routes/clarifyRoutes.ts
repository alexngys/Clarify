import { Router } from 'express';
import { getContractAnalysis, convertToSolidity, convertToClarity, getAuditReport } from '../controllers/clarifyController';

const router = Router();

router.post('/clarify', getContractAnalysis);
router.post('/convertToSolidity', convertToSolidity)
router.post('/convertToClarity', convertToClarity)
router.post("/getAuditReport", getAuditReport);

export default router;
