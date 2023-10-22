import { Router } from 'express';
import { getContractAnalysis, convertToSolidity, convertToClarity, getAuditReport, compileContract } from '../controllers/clarifyController';

const router = Router();

router.post('/clarify', getContractAnalysis);
router.post('/convertToSolidity', convertToSolidity)
router.post('/convertToClarity', convertToClarity)
router.post("/getAuditReport", getAuditReport);
router.post("/compileContract", compileContract)

export default router;
