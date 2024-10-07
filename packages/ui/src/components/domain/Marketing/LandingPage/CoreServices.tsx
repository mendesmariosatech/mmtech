import React from "react";
import { ArrowRight, Save, Lock, Settings } from "lucide-react";

export function CoreServices() {
	const services = [
		{
			icon: <Save className="w-8 h-8 text-emerald-500" />,
			title: "Exclusive Design",
			description:
				"We provide quick and detailed answers for your awesome business.",
			color: "emerald",
		},
		{
			icon: <Lock className="w-8 h-8 text-blue-800" />,
			title: "Responsive layout",
			description:
				"We provide quick and detailed answers for your awesome business.",
			color: "blue",
		},
		{
			icon: <Settings className="w-8 h-8 text-rose-500" />,
			title: "Easy to Customize",
			description:
				"We provide quick and detailed answers for your awesome business.",
			color: "rose",
		},
	];

	return (
		<section className="py-16 px-4">
			<div className="max-w-6xl mx-auto">
				<h2 className="text-3xl font-bold text-center mb-2">Core Services</h2>
				<div className="w-24 h-1 bg-blue-600 mx-auto mb-12"></div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{services.map((service, index) => (
						<div
							key={index}
							className={`p-6 rounded-lg shadow-lg ${
								index === 1 ? "bg-blue-600 text-white" : "bg-white"
							}`}
						>
							<div
								className={`w-16 h-16 rounded-full ${`bg-${service.color}-100`} flex items-center justify-center mb-4`}
							>
								{service.icon}
							</div>
							<h3 className="text-xl font-semibold mb-2">{service.title}</h3>
							<p className="mb-4">{service.description}</p>
							<a
								href="#"
								className={`inline-flex items-center ${
									index === 1 ? "text-white" : "text-gray-600"
								} hover:underline`}
							>
								read more <ArrowRight className="w-4 h-4 ml-1" />
							</a>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
