import {
	OrderResponse,
	TrackingExistsResponse,
	TrackingResponse,
} from "api/src/types/response.types";

export const API_HOST =
	process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

async function getTrackingsByEmail(email: string): Promise<TrackingResponse> {
	const response = await fetch(
		`${API_HOST}/tracking/getByEmail?email=${email}`
	);
	return await response.json();
}

async function queryEmailHasTrackings(
	email: string
): Promise<TrackingExistsResponse> {
	const response = await fetch(`${API_HOST}/tracking/exists?email=${email}`);
	return await response.json();
}

async function getOrder(orderNo: string): Promise<OrderResponse> {
	const response = await fetch(`${API_HOST}/order/${orderNo}`);
	return await response.json();
}

export { getTrackingsByEmail, queryEmailHasTrackings, getOrder };
