export function getBaseUrl() {
	if (typeof window !== "undefined") return window.location.origin;
	if (!process.env.NEXT_PUBLIC_DOMAIN) {
		throw new Error("NEXT_PUBLIC_DOMAIN não está definido");
	}
	const domain = process.env.NEXT_PUBLIC_DOMAIN;
	if (!/^[a-zA-Z0-9][a-zA-Z0-9-_.]+[a-zA-Z0-9]$/.test(domain)) {
		throw new Error("NEXT_PUBLIC_DOMAIN contém caracteres inválidos");
	}
	if (domain.startsWith("localhost")) {
		return `http://${domain}`;
	}
	return `https://${domain}`;
}
