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
} from "lucide-react";

const iconMap: Record<string, JSX.Element> = {
	Home: <Home className="h-5 w-5" />,
	ShoppingCart: <ShoppingCart className="h-5 w-5" />,
	Package: <Package className="h-5 w-5" />,
	Users2: <Users2 className="h-5 w-5" />,
	LineChart: <LineChart className="h-5 w-5" />,
	Settings: <Settings className="h-5 w-5" />,
	ChevronLeft: <ChevronLeft className="h-5 w-5" />,
	ChevronRight: <ChevronRight className="h-5 w-5" />,
	Copy: <Copy className="h-5 w-5" />,
	CreditCard: <CreditCard className="h-5 w-5" />,
	File: <File className="h-5 w-5" />,
	ListFilter: <ListFilter className="h-5 w-5" />,
	MoreVertical: <MoreVertical className="h-5 w-5" />,
	Package2: <Package2 className="h-5 w-5" />,
	PanelLeft: <PanelLeft className="h-5 w-5" />,
	Search: <Search className="h-5 w-5" />,
	Truck: <Truck className="h-5 w-5" />,
};

export function getIcon(iconName: string) {
	return iconMap[iconName] || null; // Retorna o ícone correspondente ou null se não encontrado
}
