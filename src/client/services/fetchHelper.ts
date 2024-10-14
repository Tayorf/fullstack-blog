import { SupportMethods } from "../types";
import Alert from "sweetalert2";
export const tokenKey = "token";
function fetcher<T = any>(url: string, method: SupportMethods, rawData?: unknown) {
	const headers: HeadersInit = {};
	const options: RequestInit = {
		method,
		headers,
	};

	if (method === "POST" || method === "PUT") {
		headers["Content-Type"] = "application/json";
		options["body"] = JSON.stringify(rawData);
	}

	const TOKEN = localStorage.getItem(tokenKey);

	if (TOKEN) {
		headers["Authorization"] = `Bearer ${TOKEN}`;
	}

	return new Promise<T>(async (resolve, reject) => {
		try {
			const res = await fetch(process.env.SERVER_URL + url, options);
			const alertData = await res.json();
			if (res.ok) {
				resolve(alertData);

				if (alertData.message) {
					Alert.fire({
						icon: "success",
						text: alertData.message,
						timer: 5000,
					});
				}
			} else {
				console.error(alertData);
				if (url === "/auth/checkem") {
					return reject(alertData);
				}
				Alert.fire({
					icon: "error",
					title: "Sever Error",
					text: alertData.message,
					timer: 5000,
				});
				reject(alertData);
			}
		} catch (error) {
			const err = error as Error;
			if (err.message) {
				Alert.fire({
					icon: "error",
					title: "Networking Error",
					text: err.message,
					timer: 5000,
				});
			}
			console.log(error);
			reject(error);
		}
	});
}

export const GET = <T = any>(url: string) => fetcher<T>(url, "GET");
export const DELETE = <T = any>(url: string) => fetcher<T>(url, "DELETE");
export const POST = <T = any>(url: string, rawData: unknown) => fetcher<T>(url, "POST", rawData);
export const PUT = <T = any>(url: string, rawData: unknown) => fetcher<T>(url, "PUT", rawData);