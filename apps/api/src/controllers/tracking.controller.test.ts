import { Request, Response } from "express";
import {
	getTrackingByEmail,
	queryEmailHasTrackings,
} from "./tracking.controller";
import {
	queryTrackingExistsByEmail,
	fetchTrackingsByEmail,
} from "../services/tracking.service";

jest.mock("../services/tracking.service", () => ({
	queryTrackingExistsByEmail: jest.fn(),
	fetchTrackingsByEmail: jest.fn(),
}));

describe("Tracking Controller Functions", () => {
	const mockReq = {
		query: { email: "test@example.com" },
	} as unknown as Request;

	const mockRes = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn(),
	} as unknown as Response;

	describe("getTrackingByEmail", () => {
		const mockTrackingsData = [
			{
				orderNo: "order123",
				deliveryAddress: "123 Main St, Test City, USA",
				latestStatus: "Delivered",
				tracking_number: "tracking123",
			},
		];

		it("responds with the tracking data", async () => {
			(fetchTrackingsByEmail as jest.Mock).mockResolvedValue(
				mockTrackingsData
			);

			await getTrackingByEmail(mockReq, mockRes);

			expect(mockRes.json).toHaveBeenCalledWith(mockTrackingsData);
		});

		it("responds with 404 if no trackings found", async () => {
			(fetchTrackingsByEmail as jest.Mock).mockResolvedValue([]);

			await getTrackingByEmail(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(404);
			expect(mockRes.json).toHaveBeenCalledWith({
				error: "No trackings found for the provided email.",
			});
		});

		it("responds with 500 on error", async () => {
			(fetchTrackingsByEmail as jest.Mock).mockRejectedValue(
				new Error("Test error")
			);

			await getTrackingByEmail(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({
				error: "Internal server error.",
			});
		});
	});

	describe("queryEmailHasTrackings", () => {
		it("responds with the tracking existence data", async () => {
			(queryTrackingExistsByEmail as jest.Mock).mockResolvedValue(true);

			await queryEmailHasTrackings(mockReq, mockRes);

			expect(mockRes.json).toHaveBeenCalledWith({ hasTrackings: true });
		});

		it("responds with 500 on error", async () => {
			(queryTrackingExistsByEmail as jest.Mock).mockRejectedValue(
				new Error("Test error")
			);

			await queryEmailHasTrackings(mockReq, mockRes);

			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({
				error: "Internal server error.",
			});
		});
	});
});
