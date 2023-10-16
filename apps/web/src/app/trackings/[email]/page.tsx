import { getTrackingsByEmail } from "@/service/api";
import styles from "./page.module.css";
import Link from "next/link";

export type Params = {
	params: {
		email: string;
	};
};

export default async function TrackingPage({ params }: Params) {
	const trackings = await getTrackingsByEmail(params.email);

	return (
		<div className={styles["order-list"]}>
			<h1>Your Orders</h1>
			{"error" in trackings ? (
				<p>Error: {trackings.error}</p>
			) : (
				<ul className={styles["orders"]}>
					{trackings.map((tracking, index) => (
						<li key={index} className={styles["order-item"]}>
							<div>
								<strong>Order Number: </strong>
								{tracking.orderNo}
							</div>
							<div>
								<strong>Delivery Address: </strong>
								{tracking.deliveryAddress}
							</div>

							<div>
								<strong>Current Status: </strong>
								{tracking.latestStatus}
							</div>

							<Link
								href={`/order/${tracking.orderNo}`}
								className={styles["order-detail-button"]}
							>
								View Order
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
