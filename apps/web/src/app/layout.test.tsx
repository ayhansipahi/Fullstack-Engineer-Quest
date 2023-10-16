/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import RootLayout from "./layout";

describe("RootLayout", () => {
	it("renders the children", () => {
		const children = <div>Test content</div>;
		const { getByText } = render(<RootLayout>{children}</RootLayout>, {});
		expect(getByText("Test content")).toBeInTheDocument();
	});
});
