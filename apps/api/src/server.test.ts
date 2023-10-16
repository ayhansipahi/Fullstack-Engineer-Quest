import request from "supertest";
import { createServer } from "./server";

describe("Server Setup", () => {
	let app: Express.Application;

	beforeAll(() => {
		app = createServer();
	});

	it("should respond to a GET request at /healthz", async () => {
		const response = await request(app).get("/healthz");
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ ok: true });
	});

	it("should respond with 404 for unknown routes", async () => {
		const response = await request(app).get("/unknown-route");
		expect(response.status).toBe(404);
		expect(response.body).toEqual({ error: "Not Found" });
	});
});
