export const Routes = {
	client: {
		"/": "/",
		"/projects": "/projects",

		"/client/dashboard": "/client/dashboard",
		"/auth/register": "/auth/register",
		"/auth/login": "/auth/login",
		"/auth/logout": "/auth/logout",

		"/ecommerce/products": "/ecommerce/products",
		"/ecommerce/orders": "/ecommerce/orders",
		"/ecommerce/customers": "/ecommerce/customers",
		"/ecommerce/analytics": "/ecommerce/analytics",
		"/settings": "/settings",

		"/videos": {
			"/": "/videos",
			"/:id": "/videos/:id",
		},
		"/tasks": {
			"/": "/tasks",
		},
		"/page-builderV1": {
			"/": "/page-builderV1",
		},
		"/page-builderV2": {
			"/": "/page-builderV2",
		},
	},
} as const;

// have all the main pages routes here
// Videos, Tasks, Projects, Landing Page

export type RoutePath = keyof (typeof Routes)["client"];
