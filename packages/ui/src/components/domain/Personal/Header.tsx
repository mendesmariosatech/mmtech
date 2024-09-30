"use client";
import { Button } from "../../ui/button";
import Link from "next/link";

export const Header = ({
	name,
	email,
}: {
	name: string;
	email: string;
}) => {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<h1 className="text-4xl font-bold">Hello, Status</h1>
			<p className="text-lg text-muted-foreground">{email}</p>
			<p className="text-lg text-muted-foreground">{name}</p>

			<Button>
				<Link href="/auth/register">Register</Link>
			</Button>
		</div>
	);
};
