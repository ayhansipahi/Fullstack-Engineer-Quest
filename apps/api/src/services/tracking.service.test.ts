import { readCSV } from "csv-parser";
import { getLatestStatusForTracking } from "./checkpoints.service";
import {
	fetchTrackingsByEmail,
	queryTrackingExistsByEmail,
	fetchTrackingsByOrderNo,
} from "./tracking.service"; // Update the path to your file

jest.mock("csv-parser", () => ({
	readCSV: jest.fn(),
}));

jest.mock("./checkpoints.service", () => ({
	getLatestStatusForTracking: jest.fn(),
}));

describe("Tracking Service Functions", () => {
	const mockCSVData = [
		{
			email: "test@example.com",
			orderNo: "order123",
			tracking_number: "tracking123",
			street: "123 Main St",
			zip_code: "12345",
			city: "Test City",
			destination_country_iso3: "USA",
		},
	];

	const mockLatestStatus = { status: "Delivered" };

	beforeEach(() => {
		(readCSV as jest.Mock).mockResolvedValue(mockCSVData);
		(getLatestStatusForTracking as jest.Mock).mockResolvedValue(
			mockLatestStatus
		);
	});

	it("fetchTrackingsByEmail", async () => {
		const result = await fetchTrackingsByEmail("test@example.com");
		expect(result).toEqual([
			{
				orderNo: "order123",
				tracking_number: "tracking123",
				deliveryAddress: "123 Main St, 12345, Test City, USA",
				latestStatus: "Delivered",
			},
		]);
	});

	it("queryTrackingExistsByEmail", async () => {
		const result = await queryTrackingExistsByEmail("test@example.com");
		expect(result).toBeTruthy();
	});

	it("fetchTrackingsByOrderNo", async () => {
		const result = await fetchTrackingsByOrderNo("order123");
		expect(result).toEqual([
			{
				email: "test@example.com",
				orderNo: "order123",
				tracking_number: "tracking123",
				street: "123 Main St",
				zip_code: "12345",
				city: "Test City",
				destination_country_iso3: "USA",
			},
		]);
	});
});
