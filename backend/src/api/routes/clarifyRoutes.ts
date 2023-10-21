import { Router } from "express";
import {
  getContractAnalysis,
  convertToSolidity,
  getAuditReport,
} from "../controllers/clarifyController";

const router = Router();

router.post("/clarify", getContractAnalysis);
router.post("/convertToSolidity", convertToSolidity);
router.post("/getAuditReport", getAuditReport);

export default router;
