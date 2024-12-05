"use client";
import { AuthContext } from "./useAuth";

type ClientProps = {
	token: string;
	clientId: string;
	businessId?: string;
};

export const AuthProvider = ({
	children,
	auth,
}: {
	children: React.ReactNode;
	auth: ClientProps | null;
}) => {
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
