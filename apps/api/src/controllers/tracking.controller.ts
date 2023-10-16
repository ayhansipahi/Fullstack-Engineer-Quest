import { Request, Response } from "express";
import {
	queryTrackingExistsByEmail,
	fetchTrackingsByEmail,
} from "../services/tracking.service";
import logger from "logger";

export const getTrackingByEmail = async (req: Request, res: Response) => {
	const email = req.query.email as string;

	if (!email) {
		return res
			.status(400)
			.json({ error: "Email query parameter is required." });
	}

	try {
		const trackings = await fetchTrackingsByEmail(email);
		if (Object.keys(trackings).length === 0) {
			return res.status(404).json({
				error: "No trackings found for the provided email.",
			});
		}
		res.json(trackings);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Internal server error." });
	}
};
export const queryEmailHasTrackings = async (req: Request, res: Response) => {
	const email = req.query.email as string;

	if (!email) {
		return res
			.status(400)
			.json({ error: "Email query parameter is required." });
	}
	try {
		const hasTrackings = await queryTrackingExistsByEmail(email);

		res.json({ hasTrackings });
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Internal server error." });
	}
};
