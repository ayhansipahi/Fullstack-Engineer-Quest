import { readCSV } from "./readCSV";
import path from "path";

describe("readCSV", () => {
	it("should correctly parse a sample CSV file", async () => {
		const sampleCSVPath = path.join(
			__dirname,
			"__fixtures__",
			"sample.csv"
		);

		const result = await readCSV<{
			courier: string;
			orderNo: string;
			tracking_number: string;
		}>(sampleCSVPath);
		expect(result).toHaveLength(2);

		const { courier, orderNo, tracking_number } = result[0];
		expect(orderNo).toBe("ORD-123-2018");
		expect(tracking_number).toBe("00340000161200000001");
		expect(courier).toBe("DHL");
	});

	it("should return an empty array for an empty CSV file", async () => {
		const emptyCSVPath = path.join(__dirname, "__fixtures__", "empty.csv");

		const result = await readCSV(emptyCSVPath);
		expect(result).toHaveLength(0);
	});

	it("should correctly parse a comma-delimited CSV file", async () => {
		const commaDelimitedPath = path.join(
			__dirname,
			"__fixtures__",
			"comma_delimited.csv"
		);

		const result = await readCSV<{
			courier: string;
			orderNo: string;
			tracking_number: string;
		}>(commaDelimitedPath, ",");
		expect(result).toHaveLength(2);

		const firstRow = result[0];
		expect(firstRow.orderNo).toBe("ORD-789-2020");
		expect(firstRow.tracking_number).toBe("00340000161200000003");
		expect(firstRow.courier).toBe("UPS");
	});

	it("should throw an error for a non-existent file", async () => {
		const nonExistentPath = path.join(
			__dirname,
			"__fixtures__",
			"non_existent.csv"
		);

		await expect(readCSV(nonExistentPath)).rejects.toThrow();
	});
});
