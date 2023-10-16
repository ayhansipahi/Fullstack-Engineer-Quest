import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import trackingRoutes from "./routes/tracking.routes";
import orderRoutes from "./routes/order.routes";
import logger from "logger";

export const createServer = () => {
	const app = express();
	app.disable("x-powered-by")
		.use(morgan("dev"))
		.use(urlencoded({ extended: true }))
		.use(json())
		.use(cors())
		.use("/tracking", trackingRoutes)
		.use("/order", orderRoutes)
		.get("/healthz", (req, res) => {
			return res.json({ ok: true });
		})
		.use((req, res) => {
			res.status(404).send({ error: "Not Found" });
		})
		.use((err: Error, req: express.Request, res: express.Response) => {
			logger.error(err.stack);
			res.status(500).send({ error: "Internal Server Error" });
		});

	return app;
};
