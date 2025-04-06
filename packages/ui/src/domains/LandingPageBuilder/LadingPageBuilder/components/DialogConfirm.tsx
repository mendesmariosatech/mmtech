import { useState } from "react";
import { X } from "lucide-react"; // Ícone de X (fechar)
import { Button } from "@repo/ui/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@repo/ui/components/ui/dialog";

interface RemoveComponentProps {
	componentIndex: number;
	onRemoveComponent: (index: number) => void;
	component: string;
}

export function RemoveComponentButton({
	componentIndex,
	onRemoveComponent,
	component,
}: RemoveComponentProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleConfirmRemove = () => {
		onRemoveComponent(componentIndex);
		setIsDialogOpen(false);
	};

	return (
		<>
			<Button
				variant="outline"
				size="icon"
				className="text-red-500 border-red-500"
				onClick={() => setIsDialogOpen(true)} // Abre o dialog ao clicar
			>
				<X className="h-4 w-4" />
			</Button>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirmar Ação</DialogTitle>
					</DialogHeader>
					<div className="flex">
						<p>{`Tem certeza que deseja remover este`}</p>
						<b className="ml-1">{component}</b>
						<p>?</p>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
							Cancelar
						</Button>
						<Button variant="destructive" onClick={handleConfirmRemove}>
							Remover
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
