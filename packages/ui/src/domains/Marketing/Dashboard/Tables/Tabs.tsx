"use client";
import { File, ListFilter } from "lucide-react";

import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../../components/ui/card";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../../../components/ui/table";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../../../components/ui/tabs";
import { TableHeaderBuilder } from "./TableBuilder/TableBuilder";
import { TableBodyBuilder } from "./TableBuilder/TableBody";

export const DashboardTabs = () => {
	return (
		<Tabs defaultValue="week">
			<div className="flex items-center">
				<TabsList>
					<TabsTrigger value="week">Week</TabsTrigger>
					<TabsTrigger value="month">Month</TabsTrigger>
					<TabsTrigger value="year">Year</TabsTrigger>
				</TabsList>
				<div className="ml-auto flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
								<ListFilter className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only">Filter</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Filter by</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuCheckboxItem checked>
								Fulfilled
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
						<File className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only">Export</span>
					</Button>
				</div>
			</div>

			<TabsContent value="week">
				<Card x-chunk="dashboard-05-chunk-3">
					<CardHeader className="px-7">
						<CardTitle>Orders</CardTitle>
						<CardDescription>Recent orders from your store.</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeaderBuilder />
							<TableBodyBuilder />
						</Table>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
};
