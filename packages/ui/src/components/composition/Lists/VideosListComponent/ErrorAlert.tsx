"use client";
import React from "react";

import { InfoCircledIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert";

export function ErrorAlert() {
	return (
		<div className="pt-20">
			<Alert>
				<InfoCircledIcon className="h-4 w-4" />
				<AlertTitle>Sorry!</AlertTitle>
				<AlertDescription>
					Something went wrong. Try again later.
				</AlertDescription>
			</Alert>
		</div>
	);
}
