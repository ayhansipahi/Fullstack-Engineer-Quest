import { Checkpoint } from "../types/checkpoint.types";
import { readCSV } from "csv-parser";
import path from "path";

const checkpointsFile = path.join(__dirname, "..", "data", "checkpoints.csv");
export const getCheckpointsForTracking = async (
	trackingNumber: string
): Promise<Checkpoint[]> => {
	const allCheckpointsData: Checkpoint[] = await readCSV(checkpointsFile);

	return allCheckpointsData
		.filter((checkpoint) => checkpoint.tracking_number === trackingNumber)
		.sort((a, b) => {
			// timestamp  2018-04-01T00:00:00.000Z
			return a.timestamp.localeCompare(b.timestamp);
		});
};

export const getLatestStatusForTracking = async (
	trackingNumber: string
): Promise<Checkpoint> => {
	const checkpoints = await getCheckpointsForTracking(trackingNumber);
	if (checkpoints.length === 0) {
		throw new Error(
			"No checkpoints found for the provided tracking number."
		);
	}
	const latestCheckpoint = checkpoints.pop();
	if (!latestCheckpoint) {
		throw new Error(
			"Unable to get the latest checkpoint for the provided tracking number."
		);
	}
	return latestCheckpoint;
};
