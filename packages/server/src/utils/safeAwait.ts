type AwaitedResponse<T> =
	| { success: true; data: T }
	| { success: false; error: unknown };

export async function safeAwait<T>(
	promise: Promise<T>,
): Promise<AwaitedResponse<T>> {
	try {
		const data = await promise;

		if (!data) throw new Error("No data returned from safe awaited promise");

		return { success: true, data };
	} catch (error) {
		return { success: false, error };
	}
}
