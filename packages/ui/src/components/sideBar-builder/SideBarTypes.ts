import React from "react";

export interface ButtonData {
	label: string;
	icon: React.ReactNode;
	link?: string;
	disable?: boolean;
	onClick?: () => void;
}
export interface ButtonConfig {
	label: string;
	link?: string;
	icon?: React.ReactNode;
	disable?: boolean;
	onClick?: () => void;
}

export interface PropsSideBarBuilder {
	NomeEmpresa: string;
	buttonsData: ButtonData[];
	buttonConfig?: ButtonConfig[];
}
