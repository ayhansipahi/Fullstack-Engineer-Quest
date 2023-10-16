"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./page.module.css";

import { useRouter } from "next/navigation";
import { queryEmailHasTrackings } from "@/service/api";

export default function Web() {
	const { push } = useRouter();
	const [email, setEmail] = useState<string>("");
	const [error, setError] = useState<string | undefined>();

	useEffect(() => {
		setError(undefined);
	}, [email]);

	const onChange = (e: ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await queryEmailHasTrackings(email);
			if ("error" in res) {
				setError(res.error);
				return;
			}
			if ("hasTrackings" in res && res.hasTrackings) {
				push(`/trackings/${email}`);
			} else {
				setError("No trackings found for " + email);
			}
		} catch (err) {
			console.error(err);
			setError("Unable to fetch response");
		}
	};

	return (
		<div className={styles["order-lookup-page"]}>
			<h1>Order Lookup</h1>
			<form onSubmit={handleSubmit} action={"/trackings"}>
				<div className={styles["form-group"]}>
					<label className={styles.label} htmlFor="email">
						Email:
					</label>
					<input
						type="email"
						name="email"
						id="email"
						value={email}
						className={styles.input}
						onChange={onChange}
						placeholder="Enter your email"
						required
						autoFocus
					/>
				</div>
				<button
					type="submit"
					className={styles.button}
					aria-label="Submit"
				>
					Send
				</button>

				<div className={styles["form-group"]}>
					<input
						type="email"
						value="julian@parcellab.com"
						className={styles.input}
						readOnly
						disabled={true}
					/>
				</div>
			</form>
			{error && (
				<p className={styles.error} aria-live="assertive">
					{error}
				</p>
			)}
		</div>
	);
}
