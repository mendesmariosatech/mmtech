import { hono_client } from "../hono-client";

// todo: make this component send a client ID in the query string as well as a client secret and token
export const Title = async () => {
	// fetch the information from the backend\
	const resp = await hono_client.api.personal.me.$get({
		query: {
			email: "10",
			password: "2023-01-01",
		},
	});

	if (resp.status === 401) {
		const error = await resp.json();
		return (
			<>
				<p>Error</p>
				<p>{error.error}</p>
			</>
		);
	}

	if (resp.status === 404) {
		const error = await resp.json();
		return (
			<>
				<p>Error</p>
				<p>{error.error.message}</p>
			</>
		);
	}

	const { data } = await resp.json();

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<h1 className="text-4xl font-bold">Hello, Status {resp.status}</h1>
			<p className="text-lg text-muted-foreground">{data.email}</p>
			<p className="text-lg text-muted-foreground">{data.password}</p>
		</div>
	);
};
