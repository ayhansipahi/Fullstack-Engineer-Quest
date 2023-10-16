import LoggerInstance from "./log";

describe("Logger", () => {
	let logger = LoggerInstance;

	it("should log an error message", () => {
		jest.spyOn(console, "error").mockImplementation(() => {});
		logger.error("This is an error message");
		expect(console.error).toHaveBeenCalledWith("This is an error message");
	});

	it("should log an info message", () => {
		jest.spyOn(console, "info").mockImplementation(() => {});
		logger.info("This is an info message");
		expect(console.info).toHaveBeenCalledWith("This is an info message");
	});

	it("should log a message", () => {
		jest.spyOn(console, "log").mockImplementation(() => {});
		logger.log("This is a log message");
		expect(console.log).toHaveBeenCalledWith("This is a log message");
	});
});
