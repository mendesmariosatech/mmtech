import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Dog, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AuthErrorPage() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center bg-background p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className="flex flex-col gap-6">
					<div className="flex items-center justify-center gap-2 text-primary">
						<Dog className="h-8 w-8" />
						<span className="text-2xl font-bold">PawTrack</span>
					</div>
					<Card>
						<CardHeader className="text-center">
							<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
								<AlertCircle className="h-6 w-6 text-destructive" />
							</div>
							<CardTitle className="text-2xl">Authentication Error</CardTitle>
							<CardDescription>
								Something went wrong during authentication
							</CardDescription>
						</CardHeader>
						<CardContent className="text-center">
							<p className="mb-4 text-sm text-muted-foreground">
								The link may have expired or already been used. Please try
								signing in again.
							</p>
							<Button asChild className="w-full">
								<Link href="/dog-walking/auth/login">Back to sign in</Link>
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
