import Papa from "papaparse";
import { promises as fs } from "fs";

export const readCSV = async <T>(
	filePath: string,
	delimiter = ";"
): Promise<T[]> => {
	const csvData = await fs.readFile(filePath, "utf8");
	const results = Papa.parse(csvData, {
		header: true,
		delimiter: delimiter,
		skipEmptyLines: true,
	});
	return results.data as T[];
};
