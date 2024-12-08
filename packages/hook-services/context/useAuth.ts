"use client";

import { createContext, useContext } from "react";

export type ClientProps = {
	token: string;
	clientId: string;
	businessId?: string;
};

export const AuthContext = createContext<ClientProps | null>(null);

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error(
			"useAuthContext deve ser utilizado dentro de um AuthProvider"
		);
	}
	return context;
};
