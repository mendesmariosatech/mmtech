"use client";

import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@repo/ui/components/ui/select";

export default function SelectFont({
	font,
	onUpdate,
}: {
	font: string;
	onUpdate: (font: any) => void;
}) {
	return (
		<Select onValueChange={(value) => onUpdate({ font: value })} value={font}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select font" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="font-sans">Sans-serif</SelectItem>
				<SelectItem value="font-serif">Serif</SelectItem>
				<SelectItem value="font-mono">Monospace</SelectItem>
			</SelectContent>
		</Select>
	);
}
