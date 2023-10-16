export interface LogProvider extends Console {}

export class Logger {
	constructor(private logProvider: LogProvider = console) {}

	error(message?: any, ...optionalParams: any[]): void {
		this.logProvider.error(message, ...optionalParams);
	}

	info(message?: any, ...optionalParams: any[]): void {
		this.logProvider.info(message, ...optionalParams);
	}

	log(message?: any, ...optionalParams: any[]): void {
		this.logProvider.log(message, ...optionalParams);
	}
}

const loggerInstance = new Logger();
export default loggerInstance;
