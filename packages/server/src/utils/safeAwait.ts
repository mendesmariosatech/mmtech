export async function safeAwait<T>(
	promise: Promise<T>,
): Promise<[T, null] | [null, unknown]> {
	try {
		const data = await promise;
		return [data, null];
	} catch (error) {
		return [null, error];
	}
}
