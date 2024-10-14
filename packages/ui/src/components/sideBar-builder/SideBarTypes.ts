import React from "react";

export interface ButtonData {
	label: string;
	icon: React.ReactNode;
	link?: string; 
	disable: boolean;
	onClick?: () => void;
	dropdownItems?: DropMenuItem[]; 
}

export interface DropMenuItem {
	label: string;
	path?: string;
	icon?: React.ReactNode;
	disabled?: boolean;
	link?: string;
	onClick?: () => void;
}

export interface ButtonConfig {
	label: string;
	path?: string;
	icon?: React.ReactNode;
	disable?: boolean;
	link?: string;	
	onClick?: () => void;
	dropdownItems?: DropMenuItem[]; 
}

export interface PropsSideBarBuilder {
	NomeEmpresa: string;
	buttonsData: ButtonData[];
	buttonConfig?: ButtonConfig[];
}