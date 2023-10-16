import type { Order, UserTrackings } from "./tracking.types";

export type ErrorResponse = {
	error: string;
};

export type TrackingResponse = UserTrackings[] | ErrorResponse;

export type TrackingExistsResponse =
	| {
			hasTrackings: boolean;
	  }
	| ErrorResponse;

export type OrderResponse = Order | ErrorResponse;
