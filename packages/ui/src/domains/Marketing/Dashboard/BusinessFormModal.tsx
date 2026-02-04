import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { CreateBusinessForm } from "@ui/components/form-builder/Forms/CreateBusiness/CreateBusinessForm";

interface BusinessFormModalProps {
	isOpen: boolean;
	onClose: () => void;
	onBusinessCreated?: () => void;
}

export function BusinessFormModal({
	isOpen,
	onClose,
	onBusinessCreated,
}: BusinessFormModalProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSuccess = () => {
		onBusinessCreated?.();
		handleClose();
	};

	const handleClose = () => {
		onClose();
		setTimeout(() => setIsSubmitting(false), 300); // Reset submitting state after close animation
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Create New Business</DialogTitle>
					<DialogDescription>
						Fill in the details below to create a new business for your account.
					</DialogDescription>
				</DialogHeader>
				<CreateBusinessForm onSuccess={handleSuccess} onCancel={handleClose} />
			</DialogContent>
		</Dialog>
	);
}
