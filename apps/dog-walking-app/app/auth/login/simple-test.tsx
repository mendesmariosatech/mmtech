"use client";

export default function SimpleLoginTest() {
	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="max-w-md w-full">
				<h1 className="text-2xl font-bold mb-4">Test Login Page</h1>
				<form className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">Email</label>
						<input
							type="email"
							className="w-full p-2 border rounded"
							placeholder="demo@example.com"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">Password</label>
						<input
							type="password"
							className="w-full p-2 border rounded"
							placeholder="password"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white p-2 rounded"
						onClick={(e) => {
							e.preventDefault();
							alert("Login clicked - this would authenticate");
							console.log("Login test clicked");
						}}
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}
