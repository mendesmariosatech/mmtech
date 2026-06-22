import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Dog, Mail } from "lucide-react";
import Link from "next/link";

export default function SignUpSuccessPage() {
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
							<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
								<Mail className="h-6 w-6 text-primary" />
							</div>
							<CardTitle className="text-2xl">Check your email</CardTitle>
							<CardDescription>
								{"We've sent you a confirmation link"}
							</CardDescription>
						</CardHeader>
						<CardContent className="text-center text-sm text-muted-foreground">
							<p>
								Click the link in your email to confirm your account and start
								managing your dog walking business.
							</p>
							<p className="mt-4">
								<Link
									href="/auth/login"
									className="text-primary underline underline-offset-4"
								>
									Return to sign in
								</Link>
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
