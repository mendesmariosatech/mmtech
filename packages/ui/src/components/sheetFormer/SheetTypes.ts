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

export type SheetFormerProps = {
	triggerIcon?: React.ReactNode;
	triggerLabel?: string;
	position?: "left" | "right";
	buttonTop?: ButtonTop[];
	buttonBotton?: ButtonBotton[];
	companyName?: string;
};
