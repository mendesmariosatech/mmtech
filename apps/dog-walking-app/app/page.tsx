import { Button } from "@repo/ui/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/ui/card";

export default function DogWalkingHome() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 p-6">
			<div className="max-w-6xl mx-auto">
				<header className="text-center mb-12">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">🐕 PawTrack</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Professional dog walking business management platform integrated
						with the MM-Tech ecosystem
					</p>
				</header>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								🗓️ Walk Scheduling
							</CardTitle>
							<CardDescription>
								Schedule and manage dog walks using our integrated calendar
								system
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-gray-600">
								Powered by the shared calendar API and components
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								👥 Employee Management
							</CardTitle>
							<CardDescription>
								Manage dog walkers with our existing authentication system
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-gray-600">
								Uses shared auth components and user management
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								🐾 Client & Pet Tracking
							</CardTitle>
							<CardDescription>
								Track clients and their pets using shared business logic
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-gray-600">
								Integrates with existing business and customer management
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								💰 Billing & Invoicing
							</CardTitle>
							<CardDescription>
								Generate invoices using the shared invoice system
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-gray-600">
								Leverages existing payment and billing infrastructure
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								📊 Analytics & Reports
							</CardTitle>
							<CardDescription>
								Business insights with shared charting components
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-gray-600">
								Uses shared data visualization and analytics
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								🔒 Secure Access
							</CardTitle>
							<CardDescription>
								Role-based access with integrated authentication
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-gray-600">
								Built on the monorepo's auth and security foundation
							</p>
						</CardContent>
					</Card>
				</div>

				<div className="text-center">
					<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-2xl mx-auto">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Monorepo Integration Benefits
						</h2>
						<ul className="text-left space-y-2 text-gray-600 mb-6">
							<li>✅ Shared UI components from @repo/ui</li>
							<li>✅ Integrated authentication system</li>
							<li>✅ Common backend APIs and services</li>
							<li>✅ Consistent design system and theming</li>
							<li>✅ Shared business logic and data types</li>
							<li>✅ Unified development and deployment</li>
						</ul>
						<div className="flex gap-4 justify-center">
							<Button>Get Started</Button>
							<Button variant="outline">Learn More</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
