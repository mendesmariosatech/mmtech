export const COOKIES = {
	USER_TOKEN: "USER_TOKEN",
	USER_ID: "USER_ID",
} as const;

export type COOKIES_KEYS = keyof typeof COOKIES;

// // create setter and getter for cookies
// export const setCookie = (c: Context, key: COOKIES_KEYS, value: string) => {
// 	c.res.setHeader("Set-Cookie", `${key}=${value}; Path=/; HttpOnly`);
// };
