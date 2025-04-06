import React from "react";

export const ProjectTile = () => {
	return (
		<a
			href="#"
			className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
		>
			<h2 className="text-xl font-semibold text-gray-700 mb-4">
				Project 4: Portfolio Website
			</h2>
			<p className="text-gray-600 mb-4">
				A personal portfolio website to showcase projects, skills, and
				experience.
			</p>
			<span className="text-blue-500 hover:text-blue-700 transition-colors duration-200 text-sm font-medium">
				View Project
			</span>
		</a>
	);
};
