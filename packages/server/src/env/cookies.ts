export const COOKIES = {
	USER_TOKEN: "USER_TOKEN",
	USER_ID: "USER_ID",
	BUSINESS_ID: "BUSINESS_ID",
} as const;

export type COOKIES_KEYS = keyof typeof COOKIES;
