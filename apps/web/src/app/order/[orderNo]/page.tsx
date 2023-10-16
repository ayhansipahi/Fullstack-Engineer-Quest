import { getOrder } from "@/service/api";
import Image from "next/image";

import styles from "./page.module.css";

type Params = {
	params: {
		orderNo: string;
	};
};

export default async function TrackingPage({ params }: Params) {
	const order = await getOrder(params.orderNo);

	return (
		<div className={styles["order-page"]}>
			<h1>Order</h1>

			{"error" in order ? <p>Error: {order.error}</p> : null}
			{"orderNo" in order ? (
				<>
					<p>
						<b>Order Number: </b> {order.orderNo}
					</p>
					<p>
						<b>Delivery Address: </b> {order.deliveryAddress}
					</p>
					<hr />
					<h2>Tracking </h2>
					<p>
						<b>Trx. No: </b>
						{order.tracking_number}
					</p>
					<p>
						<b>Status: </b>
						{order.latestStatus.status_text}
					</p>
					<p>{order.latestStatus.status_details}</p>
					<hr />
					<h2>Articles </h2>

					{order.articles.map((article) => (
						<div
							key={article.articleNo}
							className={styles["article"]}
						>
							<div
								className={styles["article-quantity"]}
							>{`${article.quantity}x`}</div>
							<div className={styles["article-image"]}>
								<Image
									src={article.articleImageUrl}
									alt={article.product_name}
									width={48}
									height={48}
								/>
							</div>
							<div className={styles["article-details"]}>
								<div className={styles["article-name"]}>
									{article.product_name}
								</div>
								<div className={styles["article-no"]}>
									{article.articleNo}
								</div>
							</div>
						</div>
					))}
				</>
			) : null}
		</div>
	);
}
