import { Button } from "../../../ui/button";

export const CTACreateVideoLink = () => {
	// const { openSheet } = useSheetState()
	const openSheet = () => {};

	return (
		<div className="text-center h-64 content-end">
			<Button
				variant={"outline"}
				onClick={openSheet}
				className="text-lg text-primary"
			>
				{"Press '+' to start adding videos"}
			</Button>
		</div>
	);
};
