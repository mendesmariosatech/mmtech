import { Hero } from "./Hero";
import { CardStrip } from "./CardStrip";
import { Section } from "./Section";

export function LandingPage() {
	return (
		<div className="min-h-screen bg-white">
			<Hero />
			<CardStrip />
			<Section />
		</div>
	);
}
