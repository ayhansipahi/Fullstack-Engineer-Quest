import { Request, Response } from "express";
import { getOrder } from "./order.controller";
import { fetchTrackingsByOrderNo } from "../services/tracking.service";
import { getLatestStatusForTracking } from "../services/checkpoints.service";

jest.mock("../services/tracking.service", () => ({
	fetchTrackingsByOrderNo: jest.fn(),
}));

jest.mock("../services/checkpoints.service", () => ({
	getLatestStatusForTracking: jest.fn(),
}));

describe("getOrder", () => {
	const mockReq = {
		params: { orderNo: "order123" },
	} as unknown as Request;

	const mockRes = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn(),
	} as unknown as Response;

	it("responds with the order data", async () => {
		(fetchTrackingsByOrderNo as jest.Mock).mockResolvedValue(
			mockTrackingsData
		);
		(getLatestStatusForTracking as jest.Mock).mockResolvedValue(
			mockLatestStatus
		);

		await getOrder(mockReq, mockRes);

		expect(mockRes.json).toHaveBeenCalledWith(mockExpectedOrder);
	});

	it("responds with 404 if no trackings found", async () => {
		(fetchTrackingsByOrderNo as jest.Mock).mockResolvedValue([]);

		await getOrder(mockReq, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(404);
		expect(mockRes.json).toHaveBeenCalledWith({
			error: "No trackings found for the provided order.",
		});
	});

	it("responds with 500 on error", async () => {
		(fetchTrackingsByOrderNo as jest.Mock).mockRejectedValue(
			new Error("Test error")
		);

		await getOrder(mockReq, mockRes);

		expect(mockRes.status).toHaveBeenCalledWith(500);
		expect(mockRes.json).toHaveBeenCalledWith({
			error: "Internal server error.",
			message: "Test error",
		});
	});
});

const mockTrackingsData = [
	{
		tracking_number: "tracking123",
		destination_country_iso3: "USA",
		street: "123 Main St",
		zip_code: "12345",
		city: "Test City",
		articleNo: "article123",
		articleImageUrl: "https://example.com/image.jpg",
		quantity: 2,
		product_name: "Test Product",
	},
];

const mockLatestStatus = {
	status: "Delivered",
};

const mockExpectedOrder = {
	orderNo: "order123",
	deliveryAddress: "123 Main St, 12345, Test City, USA",
	tracking_number: "tracking123",
	latestStatus: { status: "Delivered" },
	articles: [
		{
			articleNo: "article123",
			articleImageUrl: "https://example.com/image.jpg",
			quantity: 2,
			product_name: "Test Product",
		},
	],
};
