import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Dog,
	Users,
	Footprints,
	FileText,
	Clock,
	Smartphone,
} from "lucide-react";

export default function HomePage() {
	return (
		<div className="flex min-h-svh flex-col">
			{/* Header */}
			<header className="border-b bg-card">
				<div className="container mx-auto flex items-center justify-between px-4 py-4">
					<div className="flex items-center gap-2">
						<Dog className="h-8 w-8 text-primary" />
						<span className="text-xl font-bold">PawTrack</span>
					</div>
					<div className="flex items-center gap-4">
						<Button variant="ghost" asChild>
							<Link href="/auth/login">Sign In</Link>
						</Button>
						<Button asChild>
							<Link href="/auth/sign-up">Get Started</Link>
						</Button>
					</div>
				</div>
			</header>

			{/* Hero */}
			<section className="flex-1 bg-gradient-to-b from-background to-secondary/30">
				<div className="container mx-auto px-4 py-20 text-center">
					<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
						Manage Your Dog Walking
						<span className="block text-primary">Business With Ease</span>
					</h1>
					<p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
						Track walks, manage employees, invoice clients, and calculate
						payroll - all in one simple platform designed for dog walking
						companies.
					</p>
					<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<Button size="lg" asChild className="h-12 px-8">
							<Link href="/auth/sign-up">Start Free Trial</Link>
						</Button>
						<Button size="lg" variant="outline" asChild className="h-12 px-8">
							<Link href="/auth/login">Sign In</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Features */}
			<section className="border-t bg-card py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-center text-3xl font-bold">
						Everything You Need
					</h2>
					<p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
						A complete solution for managing your dog walking business from
						start to finish.
					</p>
					<div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						<FeatureCard
							icon={Users}
							title="Employee Management"
							description="Add team members, set hourly rates, and track their performance."
						/>
						<FeatureCard
							icon={Footprints}
							title="Walk Tracking"
							description="Employees can start and stop walks with a mobile-friendly timer."
						/>
						<FeatureCard
							icon={Clock}
							title="Real-Time Updates"
							description="See active walks and completed walks in real-time on your dashboard."
						/>
						<FeatureCard
							icon={FileText}
							title="Invoice Generation"
							description="Create and print invoices for clients based on completed walks."
						/>
						<FeatureCard
							icon={Smartphone}
							title="Mobile-First Design"
							description="Employees can track walks on their phone while out with dogs."
						/>
						<FeatureCard
							icon={Dog}
							title="Client Management"
							description="Store client info, dog details, custom rates, and special notes."
						/>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="border-t py-20">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold">Ready to Get Started?</h2>
					<p className="mx-auto mt-4 max-w-xl text-muted-foreground">
						Join dog walking businesses who trust PawTrack to manage their
						operations.
					</p>
					<Button size="lg" asChild className="mt-8 h-12 px-8">
						<Link href="/auth/sign-up">Create Your Account</Link>
					</Button>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t bg-card py-8">
				<div className="container mx-auto flex items-center justify-center gap-2 px-4 text-sm text-muted-foreground">
					<Dog className="h-4 w-4" />
					<span>PawTrack - Built for Dog Walking Businesses</span>
				</div>
			</footer>
		</div>
	);
}

function FeatureCard({
	icon: Icon,
	title,
	description,
}: { icon: React.ElementType; title: string; description: string }) {
	return (
		<div className="rounded-lg border bg-background p-6">
			<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
				<Icon className="h-6 w-6 text-primary" />
			</div>
			<h3 className="mt-4 text-lg font-semibold">{title}</h3>
			<p className="mt-2 text-sm text-muted-foreground">{description}</p>
		</div>
	);
}
