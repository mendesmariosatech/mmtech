import React from "react";
import { ProjectTile } from "./ProjectTile";

export const ProjectList = () => {
	return (
		<body className="bg-gray-100 p-6">
			<div className="container mx-auto">
				<h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
					My Projects
				</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<ProjectTile />
				</div>
			</div>
		</body>
	);
};
