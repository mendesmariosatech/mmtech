import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../../../../components/ui/table";

import { Badge } from "../../../../../components/ui/badge";
import { HeaderKeys } from "./TableBuilder";

import { format, formatDistance, formatRelative, subDays } from "date-fns";

// shape of the object has to be the same shape as the table
type DataSetObject = Record<HeaderKeys, string> & {
	customerEmail: string;
};

// create a more extensive data set
const multi: DataSetObject[] = new Array(20).fill({
	customer: "Joe",
	customerEmail: "@gmail.com",
	type: "Contra integra",
	amount: "$20",
	date: formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true }),
	status: "Pending",
} satisfies DataSetObject);

export const TableBodyBuilder = () => {
	return (
		<TableBody>
			{multi.map((data, index) => {
				return (
					<TableRow className={index % 2 === 0 ? "bg-accent" : undefined}>
						<TableCell>
							<div className="font-medium">{data.customer}</div>
							<div className="hidden text-sm text-muted-foreground md:inline">
								{data.customerEmail}
							</div>
						</TableCell>
						<TableCell className="hidden sm:table-cell">Refund</TableCell>
						<TableCell className="hidden sm:table-cell">
							<Badge className="text-xs" variant="outline">
								{data.type}
							</Badge>
						</TableCell>
						<TableCell className="hidden md:table-cell">{data.date}</TableCell>
						<TableCell className="text-right">{data.amount}</TableCell>
					</TableRow>
				);
			})}
		</TableBody>
	);
};
