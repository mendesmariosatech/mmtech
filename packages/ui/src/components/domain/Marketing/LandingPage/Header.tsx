import { ShoppingCart, Search, MessageCircle } from "lucide-react";
import { Button } from "../../../ui/button";
import Link from "next/link";
import Image from "next/image";

const texts = {
	EN: {
		welcome: "Welcome to Our Multi Platform",
		title: "Discover amazing features and boost your productivity",
		subtitle: `Join thousands of users who are already enjoying our services.
            Start your journey today!`,
		login: "Login",
		register: "Register",
	},
};

export function Header() {
	return (
		<>
			{/* Navigation */}
			<nav className="flex items-center justify-between p-4 bg-white">
				<div className="flex items-center">
					<svg
						className="w-8 h-8 mr-2"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4338CA" />
						<path
							d="M2 17L12 22L22 17"
							stroke="#4338CA"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M2 12L12 17L22 12"
							stroke="#4338CA"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<span className="text-2xl font-bold text-gray-800">MM</span>
				</div>
				<div className="sm:hidden md:flex space-x-4">
					<Button
						variant={"link"}
						className="text-gray-600 hover:text-gray-800"
					>
						HOME
					</Button>
					<Button
						// href="/pages"
						variant={"link"}
						className="text-gray-600 hover:text-gray-800"
					>
						PAGES
					</Button>
					<Button
						// href="/services"
						variant={"link"}
						className="text-gray-600 hover:text-gray-800"
					>
						SERVICES
					</Button>
					<Button
						// href="/elements"
						variant={"link"}
						className="text-gray-600 hover:text-gray-800"
					>
						ELEMENTS
					</Button>
					<Button
						// href="/shop"
						variant={"link"}
						className="text-gray-600 hover:text-gray-800"
					>
						SHOP
					</Button>
					<Button
						// href="/blog"
						variant={"link"}
						className="text-gray-600 hover:text-gray-800"
					>
						BLOG
					</Button>
				</div>
				<div className="flex items-center space-x-4">
					<button className="relative">
						<ShoppingCart className="w-6 h-6 text-gray-600" />
						<span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
							3
						</span>
					</button>
					<Search className="w-6 h-6 text-gray-600" />
				</div>
			</nav>

			{/* Hero Section */}
			<div className="relative overflow-hidden">
				<div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600 rounded-bl-full z-0"></div>
				<div className="container mx-auto px-4 py-12 flex flex-col sm:flex-row items-center relative z-10">
					<div className="md:w-1/2 mb-8 md:mb-0">
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
							MM Tech <span className="text-blue-600">Startup</span>
							<br />
							Agency template
						</h1>
						<p className="text-xl text-gray-600 mb-6">
							We make it a priority to offer flexible results and data to
							include your must needs do it.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<Button asChild size="lg" variant={"default"}>
								<Link href="/auth/login">{texts.EN.login}</Link>
							</Button>
							<Button asChild variant="outline" size="lg">
								<Link href="/auth/register">{texts.EN.register}</Link>
							</Button>
						</div>
					</div>

					<div className="md:w-1/2">
						<Image
							src="https://amava.websitelayout.net/img/content/content-13.svg"
							alt="Startup Agency Illustration"
							width={600}
							height={400}
							className="w-full h-auto"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
