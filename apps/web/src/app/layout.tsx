import React, { ReactNode } from "react";
import "normalize.css/normalize.css";
import "./global.css";
import styles from "./layout.module.css";
import Link from "next/link";

import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

interface LayoutProps {
	children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
	return (
		<html lang="en">
			<body className={`${styles.layout} ${inter.className}`}>
				<header className={styles.header}>
					<Link href={"/"}>Home</Link>
				</header>
				<main className={styles.main}>{children}</main>
			</body>
		</html>
	);
};

export default RootLayout;
