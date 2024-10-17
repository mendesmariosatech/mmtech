import { SideBarFormer } from "@repo/ui/components/sideBar-builder/SideBarFormer";
import { buttonsData } from "@repo/ui/components/sideBar-builder/sideBarPath";

export default function Products() {
	return <SideBarFormer NomeEmpresa="Siloks" buttonsData={buttonsData} />;
}
