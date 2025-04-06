import React from "react";
import { ProjectTile } from "./ProjectTile";
import { Routes } from "@repo/data-testing/Routes";

export const typedKeys = <T extends Record<string, unknown>>(obj?: T) =>
	Object.keys(obj ?? {}) as (keyof T)[];

const filteredRoutes = typedKeys(Routes.client).filter((route) => {
	switch (route) {
		case "/videos":
			return true;
		case "/tasks":
			return true;
		case "/page-builder":
			return true;
		case "/page-builderV2":
			return true;
		default:
			return false;
	}
});

export const ProjectList = () => {
	return (
		<body className="bg-gray-100 p-6">
			<div className="container mx-auto">
				<h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
					My Projects
				</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredRoutes.map((key) => (
						<ProjectTile key={key} link={key} />
					))}
				</div>
			</div>
		</body>
	);
};
