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

import {
	ChevronLeft,
	ChevronRight,
	Copy,
	CreditCard,
	File,
	Home,
	LineChart,
	ListFilter,
	MoreVertical,
	Package,
	Package2,
	PanelLeft,
	Search,
	Settings,
	ShoppingCart,
	Truck,
	Users2,
} from "lucide-react"
import { PropsSideBarBuilder } from "./SideBarTypes";


// Dados do menu de botões e dropdowns
export const buttonsData: PropsSideBarBuilder = {
	NomeEmpresa: "Smart Gabinete",
	buttonsData: [
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
		}		
	],
	buttonConfig: [
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
	]
};


export const buttonsDataStatic: PropsSideBarBuilder = {
	NomeEmpresa: "Smart Gabinete",
	buttonsData: [
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
	],
	buttonConfig: [
		{
			icon: <Settings className="h-6 w-6" />,
			label: "Configurações", // Botão de dropdown
			disable: false,
			link: "/settings",
		},
	]
};
