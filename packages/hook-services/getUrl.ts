export function getBaseUrl() {
	if (typeof window !== "undefined") return window.location.origin;
	if (!process.env.NEXT_PUBLIC_DOMAIN) {
		throw new Error("NEXT_PUBLIC_DOMAIN não está definido");
	}
	if (process.env.NEXT_PUBLIC_DOMAIN?.startsWith("localhost"))
		return `http://${process.env.NEXT_PUBLIC_DOMAIN}`;
	return `https://${process.env.NEXT_PUBLIC_DOMAIN}`;
}
