import express from "express";
import {
	getTrackingByEmail,
	queryEmailHasTrackings,
} from "../controllers/tracking.controller";

const router = express.Router();

router.get("/getByEmail", getTrackingByEmail);
router.get("/exists", queryEmailHasTrackings);

export default router;
