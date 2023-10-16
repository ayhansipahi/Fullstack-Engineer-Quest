import {
	getCheckpointsForTracking,
	getLatestStatusForTracking,
} from "./checkpoints.service"; // Update the path to your file
import { readCSV } from "csv-parser";

jest.mock("csv-parser", () => ({
	readCSV: jest.fn(),
}));

describe("Tracking functions", () => {
	const mockData = [
		{ tracking_number: "12345", timestamp: "2018-04-01T00:00:00.000Z" },
		{ tracking_number: "12345", timestamp: "2018-04-02T00:00:00.000Z" },
		{ tracking_number: "67890", timestamp: "2018-04-03T00:00:00.000Z" },
	];

	beforeEach(() => {
		(readCSV as jest.Mock).mockResolvedValue(mockData);
	});

	it("getCheckpointsForTracking returns filtered and sorted data", async () => {
		const checkpoints = await getCheckpointsForTracking("12345");
		expect(checkpoints).toEqual([
			{ tracking_number: "12345", timestamp: "2018-04-01T00:00:00.000Z" },
			{ tracking_number: "12345", timestamp: "2018-04-02T00:00:00.000Z" },
		]);
	});

	it("getLatestStatusForTracking returns the latest checkpoint", async () => {
		const latestCheckpoint = await getLatestStatusForTracking("12345");
		expect(latestCheckpoint).toEqual({
			tracking_number: "12345",
			timestamp: "2018-04-02T00:00:00.000Z",
		});
	});

	it("getLatestStatusForTracking throws an error if no checkpoints are found", async () => {
		(readCSV as jest.Mock).mockResolvedValue([]);
		await expect(getLatestStatusForTracking("12345")).rejects.toThrow(
			"No checkpoints found for the provided tracking number."
		);
	});
});
