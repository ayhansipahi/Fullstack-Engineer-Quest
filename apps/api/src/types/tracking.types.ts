import { Checkpoint } from "./checkpoint.types";

export type Article = {
	articleNo: string;
	articleImageUrl: string;
	quantity: number;
	product_name: string;
};

export type UserTrackings = {
	orderNo: string;
	deliveryAddress: string;
	latestStatus: string;
	tracking_number: string;
};

export type Order = {
	orderNo: string;
	deliveryAddress: string;
	tracking_number: string;
	latestStatus: Checkpoint;
	articles: Article[];
};

export type Tracking = {
	orderNo: string;
	tracking_number: string;
	courier: string;
	street: string;
	zip_code: string;
	city: string;
	destination_country_iso3: string;
	email: string;
	articleNo: string;
	articleImageUrl: string;
	quantity: number;
	product_name: string;
};
