"use client";

import { createContext, useContext } from "react";

export type ClientProps = {
	token: string;
	clientId: string;
	businessId?: string;
};

export const AuthContext = createContext<ClientProps | null>(null);

export const useAuthContext = () => {
	return useContext(AuthContext);
};
