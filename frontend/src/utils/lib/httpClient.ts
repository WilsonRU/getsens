import ky from 'ky';

export class HttpClient {
	private api: typeof ky;

	constructor() {
		this.api = ky.create({
			prefixUrl: import.meta.env.VITE_API_URL || 'http://localhost:4001/api/',
			headers: {
				Accept: 'application/json',
			},
		});
	}

	async get(route: string): Promise<any> {
		return await this.api
			.get(route, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem('token')}`,
				},
			})
			.json();
	}

	async post(route: string, body: unknown): Promise<any> {
		return await this.api
			.post(route, {
				json: body,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${sessionStorage.getItem('token')}`,
				},
			})
			.json();
	}

	async put(route: string, body: unknown): Promise<any> {
		return await this.api
			.put(route, {
				json: body,
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem('token')}`,
				},
			})
			.json();
	}

	async patch(route: string, body: unknown): Promise<any> {
		return await this.api
			.patch(route, {
				json: body,
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem('token')}`,
				},
			})
			.json();
	}

	async delete(route: string): Promise<any> {
		return await this.api
			.delete(route, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem('token')}`,
				},
			})
			.json();
	}
}
