import { readCSV } from "csv-parser";
import path from "path";
import { Tracking, UserTrackings } from "../types/tracking.types";
import { getLatestStatusForTracking } from "./checkpoints.service";

const trackingFile = path.join(__dirname, "..", "data", "trackings.csv");

export const fetchTrackingsByEmail = async (
	email: string
): Promise<UserTrackings[]> => {
	const trackingsData = await readCSV<Tracking>(trackingFile);
	const userTrackings = trackingsData.filter(
		(tracking) => tracking.email === email
	);

	const trackings = userTrackings.reduce(
		(
			acc: { [key: string]: Omit<UserTrackings, "latestStatus"> },
			tracking: Tracking
		) => {
			if (!acc[tracking.orderNo]) {
				acc[tracking.orderNo] = {
					orderNo: tracking.orderNo,
					tracking_number: tracking.tracking_number,
					deliveryAddress: `${tracking.street}, ${tracking.zip_code}, ${tracking.city}, ${tracking.destination_country_iso3}`,
				};
			}

			return acc;
		},
		{}
	);

	const trackingsWithStatusPromises = Object.values(trackings).map(
		async (tracking) => {
			const latestStatus = await getLatestStatusForTracking(
				tracking.tracking_number
			);
			return {
				...tracking,
				latestStatus: latestStatus.status,
			} as UserTrackings;
		}
	);
	const trackingsWithStatuses = await Promise.all(
		trackingsWithStatusPromises
	);

	return Object.values(trackingsWithStatuses);
};

export const queryTrackingExistsByEmail = async (
	email: string
): Promise<boolean> => {
	const trackingsData = await readCSV<Tracking>(trackingFile);
	const tracking = trackingsData.find((tracking) => tracking.email === email);
	return !!tracking;
};

export const fetchTrackingsByOrderNo = async (
	orderNo: string
): Promise<Tracking[]> => {
	const trackingsData = await readCSV<Tracking>(trackingFile);

	return trackingsData.filter((tracking) => tracking.orderNo === orderNo);
};
