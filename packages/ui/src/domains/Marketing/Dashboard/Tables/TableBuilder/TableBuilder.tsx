import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../../../../components/ui/table";
const typedKeys = <T extends {}>(obj?: T) =>
	Object.keys(obj ?? {}) as Array<keyof T>;

// const typedValues = <T extends {}>(obj?: T) =>
//   Object.values(obj ?? {}) as Array<T[keyof T]>;

// an array of pre stablished items
// lets make sure they always have a key and a lable
const labelRowys = ["customer", "type", "status", "date", "amount"] as const;
export type HeaderKeys = (typeof labelRowys)[number];
type Label = {
	label: string;
};

const labelRowsObjct: Record<HeaderKeys, Label> = {
	customer: {
		label: "Customer 22",
	},
	type: {
		label: "Type",
	},
	status: {
		label: "Status",
	},
	date: {
		label: "Date",
	},
	amount: {
		label: "Amount",
	},
};

export const TableHeaderBuilder = () => {
	return (
		<TableHeader>
			<TableRow>
				{/* map through the array and the rule will more like be: first get nothing, the middle ill be hidden and the last will get text right */}
				{typedKeys(labelRowsObjct).map((tableKey, index, array) => {
					const baseClass = `hidden sm:table-cell`;
					const lastClass = `text-right`;
					const finalClass =
						index === 0
							? undefined
							: index === array.length - 1
								? lastClass
								: baseClass;

					return (
						<TableHead className={finalClass}>
							{labelRowsObjct[tableKey].label}
						</TableHead>
					);
				})}
			</TableRow>
		</TableHeader>
	);
};
