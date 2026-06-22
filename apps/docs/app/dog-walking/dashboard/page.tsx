"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
	const [user, setUser] = useState<{
		name: string;
		companyName: string;
	} | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const storedUser = localStorage.getItem("current-user");

		if (!storedUser) {
			router.push("/dog-walking/auth/login");
			return;
		}

		try {
			const userData = JSON.parse(storedUser);
			setUser(userData);
			setLoading(false);
		} catch (error) {
			console.error("Error parsing user data:", error);
			router.push("/dog-walking/auth/login");
		}
	}, [router]);

	const handleLogout = () => {
		localStorage.removeItem("current-user");
		router.push("/dog-walking/auth/login");
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div>Loading...</div>
			</div>
		);
	}

	if (!user) {
		return null;
	}

	return (
		<div className="min-h-screen bg-gray-50 p-4">
			<div className="max-w-4xl mx-auto">
				<div className="bg-white shadow rounded-lg p-6">
					<div className="flex justify-between items-center mb-6">
						<div>
							<h1 className="text-2xl font-bold">Welcome to PawTrack!</h1>
							<p className="text-gray-600">
								Hi {user.name} from {user.companyName}
							</p>
						</div>
						<button
							onClick={handleLogout}
							className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
						>
							Logout
						</button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
						<div className="bg-blue-50 p-4 rounded-lg">
							<h3 className="font-semibold text-blue-900">Active Clients</h3>
							<p className="text-2xl font-bold text-blue-600">12</p>
						</div>
						<div className="bg-green-50 p-4 rounded-lg">
							<h3 className="font-semibold text-green-900">Total Walks</h3>
							<p className="text-2xl font-bold text-green-600">47</p>
						</div>
						<div className="bg-purple-50 p-4 rounded-lg">
							<h3 className="font-semibold text-purple-900">Revenue</h3>
							<p className="text-2xl font-bold text-purple-600">$1,245</p>
						</div>
					</div>

					<div className="bg-white border rounded-lg p-6">
						<h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
						<div className="space-y-3">
							<div className="flex justify-between items-center p-3 bg-gray-50 rounded">
								<div>
									<p className="font-medium">Buddy - Morning Walk</p>
									<p className="text-sm text-gray-600">
										John Doe - walked by Sarah
									</p>
								</div>
								<span className="text-sm text-green-600 font-medium">
									Completed
								</span>
							</div>
							<div className="flex justify-between items-center p-3 bg-gray-50 rounded">
								<div>
									<p className="font-medium">Max - Afternoon Walk</p>
									<p className="text-sm text-gray-600">
										Jane Smith - walked by Mike
									</p>
								</div>
								<span className="text-sm text-blue-600 font-medium">
									In Progress
								</span>
							</div>
							<div className="flex justify-between items-center p-3 bg-gray-50 rounded">
								<div>
									<p className="font-medium">Luna - Evening Walk</p>
									<p className="text-sm text-gray-600">
										Bob Brown - scheduled with Emma
									</p>
								</div>
								<span className="text-sm text-orange-600 font-medium">
									Scheduled
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
