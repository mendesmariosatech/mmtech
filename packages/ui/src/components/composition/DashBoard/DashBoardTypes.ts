export interface ButtonTop {
	label: string;
	icon: string;
	link?: string;
	disable?: boolean;
	onClick?: () => void;
}
export interface ButtonBotton {
	label: string;
	link?: string;
	icon: string;
	disable?: boolean;
	onClick?: () => void;
}

export interface DashBoardProps {
	companyName: string;
	buttonTop: ButtonTop[];
	buttonBotton?: ButtonBotton[];
}
