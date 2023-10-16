import fetchMock from "jest-fetch-mock";
import {
	API_HOST,
	getOrder,
	getTrackingsByEmail,
	queryEmailHasTrackings,
} from "./api";

fetchMock.enableMocks();

describe("queryEmailHasTrackings", () => {
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	it("should call the API with the correct email parameter", async () => {
		const email = "test@example.com";
		fetchMock.mockResponseOnce(JSON.stringify({ hasTrackings: true }));

		await queryEmailHasTrackings(email);

		expect(fetchMock).toHaveBeenCalledWith(
			`${API_HOST}/tracking/exists?email=${email}`
		);
	});

	it("should return the response from the API", async () => {
		const email = "test@example.com";
		const expectedResponse = { hasTrackings: true };
		fetchMock.mockResponseOnce(JSON.stringify(expectedResponse));

		const response = await queryEmailHasTrackings(email);

		expect(response).toEqual(expectedResponse);
	});
});

describe("getOrder", () => {
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	it("should call the API with the correct orderNo parameter", async () => {
		const orderNo = "test";
		fetchMock.mockResponseOnce(JSON.stringify({ orderNo: orderNo }));

		await getOrder(orderNo);

		expect(fetchMock).toHaveBeenCalledWith(`${API_HOST}/order/${orderNo}`);
	});

	it("should return the response from the API", async () => {
		const orderNo = "test";
		const expectedResponse = { orderNo: orderNo };
		fetchMock.mockResponseOnce(JSON.stringify(expectedResponse));

		const response = await getOrder(orderNo);

		expect(response).toEqual(expectedResponse);
	});
});

describe("getTrackingsByEmail", () => {
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	it("should call the API with the correct email parameter", async () => {
		const email = "test";
		fetchMock.mockResponseOnce(JSON.stringify({}));

		await getTrackingsByEmail(email);

		expect(fetchMock).toHaveBeenCalledWith(
			`${API_HOST}/tracking/getByEmail?email=${email}`
		);
	});

	it("should return the response from the API", async () => {
		const email = "test";
		const expectedResponse = {};
		fetchMock.mockResponseOnce(JSON.stringify(expectedResponse));

		const response = await getTrackingsByEmail(email);

		expect(response).toEqual(expectedResponse);
	});
});
