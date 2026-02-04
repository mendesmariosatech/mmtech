import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@repo/ui/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { toast } from "sonner";
import { useCreateBusiness } from "@repo/hook-services";

const CreateBusinessFormSchema = z.object({
	name: z.string().min(2, {
		message: "Business name must be at least 2 characters.",
	}),
	description: z.string().optional(),
});

type CreateBusinessFormValues = z.infer<typeof CreateBusinessFormSchema>;

interface CreateBusinessFormProps {
	onSuccess?: () => void;
	onCancel?: () => void;
}

export function CreateBusinessForm({
	onSuccess,
	onCancel,
}: CreateBusinessFormProps) {
	const { mutate: createBusiness, isPending } = useCreateBusiness({
		onSuccess: () => {
			toast.success("Business created successfully!");
			onSuccess?.();
		},
		onError: (error) => {
			toast.error("Failed to create business", {
				description: error.message,
			});
		},
	});

	const form = useForm<CreateBusinessFormValues>({
		resolver: zodResolver(CreateBusinessFormSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	function onSubmit(data: CreateBusinessFormValues) {
		createBusiness({
			name: data.name,
			description: data.description,
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Business Name</FormLabel>
							<FormControl>
								<Input placeholder="Enter business name" {...field} />
							</FormControl>
							<FormDescription>
								This is the name of your business that will be displayed.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description (Optional)</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Enter business description"
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-end space-x-2">
					<Button
						type="button"
						variant="outline"
						onClick={onCancel}
						disabled={isPending}
					>
						Cancel
					</Button>
					<Button type="submit" disabled={isPending}>
						{isPending ? "Creating..." : "Create Business"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
