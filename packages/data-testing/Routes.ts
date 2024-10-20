export const Routes = {
	client: {
		"/": "/",
		"/dashboard": "/dashboard",
		"/auth/register": "/auth/register",
		"/auth/login": "/auth/login",
		"/auth/logout": "/auth/logout",
		"/ecommerce/products": "/ecommerce/products",
		"/ecommerce/orders": "/ecommerce/orders",
		"/ecommerce/customers": "/ecommerce/customers",
		"/ecommerce/analytics": "/ecommerce/analytics",
		"/settings": "/settings",
	},
} as const;

export type RoutePath = keyof (typeof Routes)["client"];
