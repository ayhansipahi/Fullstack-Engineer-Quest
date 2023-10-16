import { Request, Response } from "express";
import { fetchTrackingsByOrderNo } from "../services/tracking.service";
import logger from "logger";
import { getLatestStatusForTracking } from "../services/checkpoints.service";
import { Order } from "../types/tracking.types";

export const getOrder = async (req: Request, res: Response) => {
	const orderNo = req.params.orderNo as string;
	try {
		const ordersTrackings = await fetchTrackingsByOrderNo(orderNo);
		if (Object.keys(ordersTrackings).length === 0) {
			res.status(404).json({
				error: "No trackings found for the provided order.",
			});
			return;
		}
		const latestStatus = await getLatestStatusForTracking(
			ordersTrackings[0].tracking_number
		);

		const {
			tracking_number,
			destination_country_iso3,
			street,
			zip_code,
			city,
		} = ordersTrackings[0];

		const deliveryAddress = `${street}, ${zip_code}, ${city}, ${destination_country_iso3}`;
		const order: Order = {
			orderNo: orderNo,
			deliveryAddress,
			tracking_number,
			latestStatus: latestStatus,
			articles: ordersTrackings.map((tracking) => {
				return {
					articleNo: tracking.articleNo,
					articleImageUrl: tracking.articleImageUrl,
					quantity: tracking.quantity,
					product_name: tracking.product_name,
				};
			}),
		};

		res.json(order);
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			error: "Internal server error.",
			message: (error as Error)?.message,
		});
	}
};
