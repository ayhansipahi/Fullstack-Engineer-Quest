const path = require("path");

module.exports = {
	reactStrictMode: true,
	transpilePackages: ["ui"],
	output: "standalone",
	experimental: {
		outputFileTracingRoot: path.join(__dirname, "../../"),
	},
	// image remote address
	images: {
		domains: ["localhost", "cdn.parcellab.com"],

	}
};
