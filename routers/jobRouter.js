import { Router } from "express";
const router = Router();

import { getAllJobs, getJob, createJob, updateJob, deleteJob } from "../controllers/jobController.js";
import { validateJobInput } from "../middleware/validationMiddleware.js";

router.route('/').get(getAllJobs).post(validateJobInput, createJob);
router.route('/:id').get(getJob).patch(validateJobInput, updateJob).delete(deleteJob);

export default router;