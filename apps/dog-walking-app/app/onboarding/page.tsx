import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dog } from "lucide-react";

export default function OnboardingPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
						<Dog className="h-8 w-8 text-primary" />
					</div>
					<CardTitle className="text-2xl">Welcome to PawTrack!</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 text-center">
					<p className="text-muted-foreground">
						Set up your dog walking business to get started with managing
						clients, employees, and walks.
					</p>
					<Button className="w-full" size="lg">
						Create Your Business
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
