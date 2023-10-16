export interface Checkpoint {
	tracking_number: string;
	location: string;
	/**
	 * ISO 8601 - 2018-04-01T00:00:00.000Z
	 */
	timestamp: string;
	status: CheckpointStatus;
	status_text: string;
	status_details: string;
}

export enum CheckpointStatus {
	OrderProcessed = "OrderProcessed",
	PickUpPlanned = "PickUpPlanned",
	Upgrade = "Upgrade",
	InboundScan = "InboundScan",
	DestinationDeliveryCenter = "DestinationDeliveryCenter",
	Scheduled = "Scheduled",
}
