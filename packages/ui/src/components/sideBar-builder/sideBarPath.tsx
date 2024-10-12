import {
	DashboardIcon,
	PersonIcon,
	HomeIcon,
	ReaderIcon,
	CubeIcon,
	CalendarIcon,
	MobileIcon,
	BellIcon,
	HandIcon,
	DesktopIcon,
	CardStackIcon,
	GlobeIcon,
	ExitIcon,
} from "@radix-ui/react-icons"; // Importe seus ícones aqui

interface ButtonData {
	icon: React.ReactNode;
	label: string;
	disable: boolean;
	link?: string; // Link opcional, já que dropdowns não necessariamente têm link
	dropdownItems?: DropMenuItem[]; // Adicionando itens de dropdown
}

interface DropMenuItem {
	label: string;
	path?: string;
	icon?: React.ReactNode;
	disabled?: boolean;
	link?: string;
	onClick?: () => void;
}

export interface PropsSideBarBuilder {
	NomeEmpresa: string;
	buttonsData: ButtonData[]; // Lista de botões, que pode incluir dropdowns
}

// Dados do menu de botões e dropdowns
export const buttonsData: ButtonData[] = [
	{
		icon: <DashboardIcon className="h-6 w-6" />,
		label: "Visão Geral",
		disable: false,
		link: "/business/dashboard",
	},
	{
		icon: <PersonIcon className="h-6 w-6" />,
		label: "Produtos",
		disable: false,
		link: "/products",
	},
	{
		icon: <HomeIcon className="h-6 w-6" />,
		label: "Instituições",
		disable: false,
		link: "/business/instituicoes",
	},
	{
		icon: <ReaderIcon className="h-6 w-6" />,
		label: "Demandas",
		disable: false,
		link: "/business/demandas",
	},
	{
		icon: <CubeIcon className="h-6 w-6" />,
		label: "Aniversários",
		disable: false,
		link: "/business/birthday",
	},
	{
		icon: <CalendarIcon className="h-6 w-6" />,
		label: "Agenda",
		disable: false,
		link: "/business/calendar",
	},
	{
		icon: <MobileIcon className="h-6 w-6" />,
		label: "Contatos de Aut",
		disable: true,
		link: "/business/contato",
	},
	{
		icon: <BellIcon className="h-6 w-6" />,
		label: "Notificações",
		disable: true,
		link: "/business/notificacao",
	},
	{
		icon: <HandIcon className="h-6 w-6" />,
		label: "Suporte",
		disable: false,
		link: "/business/suporte",
	},
	{
		icon: <DesktopIcon className="h-6 w-6" />,
		label: "Configurações", // Botão de dropdown
		disable: false,
		dropdownItems: [
			{
				icon: <PersonIcon className="h-6 w-6" />,
				label: "Usuários",
				link: "/business/usuarios",
				disabled: true,
			},
			{
				icon: <CardStackIcon className="h-6 w-6" />,
				label: "Assinatura",
				link: "/business/paymen",
			},
			{
				icon: <GlobeIcon className="h-6 w-6" />,
				label: "Links úteis",
				link: "/business/utilitarios",
			},
			{
				icon: <ExitIcon className="h-6 w-6" />,
				label: "Sair",
				link: "/login",
			},
		],
	},
];
