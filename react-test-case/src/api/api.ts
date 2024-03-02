import axios from "axios";

export function api(): any {
	const api = axios.create({
		baseURL: `https://newsapi.org/v2/`,
	});
	return api;
}
