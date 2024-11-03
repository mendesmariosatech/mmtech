import React from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";
import { Checkbox } from "../ui/checkbox"; // Make sure you import the Checkbox component
import { getIcon, IconName } from "../iconData/IconData";

export type Item = {
	id: number;
	label: string;
	isChecked: boolean;
};

export interface CollapsibleProps {
	title: string;
	icon: IconName;
	items: Item[];
}

export function CollapsableBuilder({ icon, title, items }: CollapsibleProps) {
	return (
		<Collapsible>
			<CollapsibleTrigger className="flex justify-between items-center mb-2">
				<h3 className="text-sm font-semibold">{title}</h3>
				{getIcon(icon)}
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div className="space-y-2">
					{items.map((item) => (
						<div className="flex items-center" key={item.id}>
							<Checkbox defaultChecked={item.isChecked} />
							<label className="text-sm ml-2">{item.label}</label>
						</div>
					))}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}
