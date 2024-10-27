import { Header } from "./Hero";
import { CoreServices } from "./CoreServices";
import { Section } from "./Section";

export function LandingPage() {
	return (
		<div className="min-h-screen bg-white">
			<Header />
			<CoreServices />
			<Section />
		</div>
	);
}
