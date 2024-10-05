import { Header } from "@repo/ui/components/domain/Personal/Header";
import { hono_client } from "@repo/hook-services";
import { cookies } from "next/headers";

const Dashboard = async () => {
	let honoURL;
	try {
		// const honoURL = hono_client.api.$url();

		// console.log({
		// 	honoURL,
		// })
		// const cookieStore = cookies();
		// const USER_TOKEN = cookieStore.get("USER_TOKEN");

		// get from cookie

		// const resp = await hono_client.api.personal.me.$get({
		// 	query: {
		// 		email: "10",
		// 		password: "2023-01-01",
		// 	},
		// 	header: {
		// 		authorization: USER_TOKEN?.value ? `Bearer ${USER_TOKEN?.value}` : "",
		// 	},
		// });

		// const response = await resp.json();

		// if (resp.status !== 201 && resp.status == 401) {
		//   const response = await resp.json()
		//   return <div>Error: {response.error}</div>
		// }
		// if (resp.status == 404) {
		//   const response = await resp.json()
		//   return <div>Error: {response.error.message}</div>
		// }

		// const { data } = await resp.json()
		// console.log({ data })

		return (
			<Header name={`Text:`} email={JSON.stringify({ response: "none" })} />
		);
	} catch (error) {
		console.log({ error });
		return <div>{`Error: Backend URL ${honoURL}`}</div>;
	}
};

export default Dashboard;
