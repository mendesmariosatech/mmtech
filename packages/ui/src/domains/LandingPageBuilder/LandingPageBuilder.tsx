"use client";

import { useState } from "react";
import {
	Plus,
	Settings,
	X,
	Eye,
	ChevronDown,
	ChevronRight,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import { Slider } from "../../components/ui/slider";
import { Switch } from "../../components/ui/switch";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../../components/ui/carousel";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../components/ui/popover";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../components/ui/table";
import Image from "next/image";

type ComponentType =
	| "paragraph"
	| "button"
	| "image"
	| "video"
	| "carousel"
	| "form"
	| "table"
	| "container";

interface Component {
	type: ComponentType;
	props: any;
}

interface ContainerConfig {
	backgroundColor: string;
	backgroundImage: string;
	alignment: "flex-col" | "flex-row";
	justifyContent: string;
	alignItems: string;
	padding: string;
	margin: string;
	width: string;
	height: string;
}

interface Container {
	components: Component[];
	config: ContainerConfig;
}

interface HeaderConfig {
	logo: string;
	navItems: {
		label: string;
		href: string;
		subItems?: { label: string; href: string }[];
		isList?: boolean;
	}[];
}

export function LandingPageBuilder() {
	const [containers, setContainers] = useState<Container[]>([]);
	const [headerConfig, setHeaderConfig] = useState<HeaderConfig>({
		logo: "/placeholder.svg?height=50&width=100",
		navItems: [
			{ label: "Home", href: "#" },
			{ label: "About", href: "#" },
			{
				label: "Services",
				href: "#",
				subItems: [
					{ label: "Service 1", href: "#" },
					{ label: "Service 2", href: "#" },
				],
			},
			{ label: "Products", href: "#", isList: true },
			{ label: "Contact", href: "#" },
		],
	});
	const [showPreview, setShowPreview] = useState(false);

	const addContainer = (parentIndex?: number) => {
		const newContainer: Container = {
			components: [],
			config: {
				backgroundColor: "bg-white",
				backgroundImage: "",
				alignment: "flex-col",
				justifyContent: "justify-start",
				alignItems: "items-start",
				padding: "16px 16px 16px 16px",
				margin: "0px 0px 0px 0px",
				width: "w-full",
				height: "h-auto",
			},
		};

		if (parentIndex !== undefined) {
			const newContainers = [...containers];
			const parentContainer = newContainers[parentIndex];
			if (
				parentContainer.components.filter((c) => c.type === "container")
					.length < 4
			) {
				parentContainer.components.push({
					type: "container",
					props: newContainer,
				});
				setContainers(newContainers);
			}
		} else {
			setContainers([...containers, newContainer]);
		}
	};

	const addComponent = (
		containerIndex: number,
		type: ComponentType,
		subContainerIndex?: number,
	) => {
		const newContainers = [...containers];
		const targetContainer =
			subContainerIndex !== undefined
				? (newContainers[containerIndex].components[subContainerIndex]
						.props as Container)
				: newContainers[containerIndex];

		if (targetContainer.components.length < 4) {
			targetContainer.components.push({ type, props: getDefaultProps(type) });
			setContainers(newContainers);
		}
	};

	const updateComponent = (
		containerIndex: number,
		componentIndex: number,
		newProps: any,
		subContainerIndex?: number,
	) => {
		const newContainers = [...containers];
		const targetContainer =
			subContainerIndex !== undefined
				? (newContainers[containerIndex].components[subContainerIndex]
						.props as Container)
				: newContainers[containerIndex];

		targetContainer.components[componentIndex].props = {
			...targetContainer.components[componentIndex].props,
			...newProps,
		};
		setContainers(newContainers);
	};

	const removeComponent = (
		containerIndex: number,
		componentIndex: number,
		subContainerIndex?: number,
	) => {
		const newContainers = [...containers];
		const targetContainer =
			subContainerIndex !== undefined
				? (newContainers[containerIndex].components[subContainerIndex]
						.props as Container)
				: newContainers[containerIndex];

		targetContainer.components.splice(componentIndex, 1);
		setContainers(newContainers);
	};

	const updateContainerConfig = (
		containerIndex: number,
		newConfig: Partial<ContainerConfig>,
		subContainerIndex?: number,
	) => {
		const newContainers = [...containers];
		const targetContainer =
			subContainerIndex !== undefined
				? (newContainers[containerIndex].components[subContainerIndex]
						.props as Container)
				: newContainers[containerIndex];

		targetContainer.config = {
			...targetContainer.config,
			...newConfig,
		};
		setContainers(newContainers);
	};

	const getDefaultProps = (type: ComponentType) => {
		switch (type) {
			case "paragraph":
				return {
					content: "Enter your text here",
					font: "font-sans",
					fontSize: 16,
					alignment: "text-left",
					bold: false,
					italic: false,
					underline: false,
					textColor: "text-gray-900",
					backgroundColor: "bg-transparent",
					padding: "0px 0px 0px 0px",
					margin: "0px 0px 0px 0px",
				};
			case "button":
				return {
					text: "Click me",
					link: "#",
					font: "font-sans",
					fontSize: 16,
					alignment: "text-center",
					bold: false,
					italic: false,
					underline: false,
					textColor: "text-white",
					backgroundColor: "bg-blue-500",
					padding: "8px 16px 8px 16px",
					margin: "0px 0px 0px 0px",
					width: "w-auto",
				};
			case "image":
				return {
					src: "/placeholder.svg?height=200&width=300",
					alt: "Placeholder image",
					width: 300,
					height: 200,
					opacity: 100,
					objectFit: "object-cover",
				};
			case "video":
				return {
					src: "https://example.com/video.mp4",
					width: 640,
					height: 360,
					autoplay: false,
					muted: false,
					defaultSize: true,
					controls: true,
				};
			case "carousel":
				return {
					items: [
						{
							image: "/placeholder.svg?height=200&width=300",
							text: "",
							link: "",
							buttonText: "",
						},
					],
					slideCount: 1,
					showText: false,
					showLinks: false,
					showButtons: false,
					isCardType: false,
					autoPlay: false,
					interval: 3000,
					visibleSlides: 1,
				};
			case "form":
				return {
					title: "Contact Us",
					subtitle: "Fill out the form below",
					font: "font-sans",
					fontSize: 16,
					alignment: "text-left",
					fields: [{ label: "Email", type: "email" }],
					buttonText: "Submit",
					buttonColor: "bg-blue-500",
					buttonTextColor: "text-white",
				};
			case "table":
				return {
					rows: 3,
					columns: 3,
					headers: ["Header 1", "Header 2", "Header 3"],
					data: [
						["Row 1, Cell 1", "Row 1, Cell 2", "Row 1, Cell 3"],
						["Row 2, Cell 1", "Row 2, Cell 2", "Row 2, Cell 3"],
					],
					striped: false,
					hoverable: false,
					bordered: false,
				};
			case "container":
				return {
					components: [],
					config: {
						backgroundColor: "bg-white",
						backgroundImage: "",
						alignment: "flex-col",
						justifyContent: "justify-start",
						alignItems: "items-start",
						padding: "16px 16px 16px 16px",
						margin: "0px 0px 0px 0px",
						width: "w-full",
						height: "h-auto",
					},
				};
			default:
				return {};
		}
	};

	return (
		<div className="min-h-screen flex flex-col">
			<Header config={headerConfig} onConfigUpdate={setHeaderConfig} />
			<main className="flex-grow p-4">
				{containers.map((container, containerIndex) => (
					<ContainerComponent
						key={containerIndex}
						container={container}
						containerIndex={containerIndex}
						onAddComponent={(type) => addComponent(containerIndex, type)}
						onUpdateComponent={(componentIndex, newProps) =>
							updateComponent(containerIndex, componentIndex, newProps)
						}
						onRemoveComponent={(componentIndex) =>
							removeComponent(containerIndex, componentIndex)
						}
						onUpdateConfig={(newConfig) =>
							updateContainerConfig(containerIndex, newConfig)
						}
						onAddSubContainer={() => addContainer(containerIndex)}
					/>
				))}
			</main>
			<Footer />
			<div className="fixed bottom-4 right-4 flex space-x-2">
				<Button
					onClick={() => setShowPreview(true)}
					className="rounded-full w-12 h-12 p-0"
				>
					<Eye className="w-6 h-6" />
					<span className="sr-only">Preview</span>
				</Button>
				<Button
					onClick={() => addContainer()}
					className="rounded-full w-12 h-12 p-0"
				>
					<Plus className="w-6 h-6" />
					<span className="sr-only">Add container</span>
				</Button>
			</div>
			{showPreview && (
				<Dialog open={showPreview} onOpenChange={setShowPreview}>
					<DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>Landing Page Preview</DialogTitle>
						</DialogHeader>
						<LandingPagePreview
							headerConfig={headerConfig}
							containers={containers}
						/>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}

function ContainerComponent({
	container,
	containerIndex,
	onAddComponent,
	onUpdateComponent,
	onRemoveComponent,
	onUpdateConfig,
	onAddSubContainer,
}: {
	container: Container;
	containerIndex: number;
	onAddComponent: (type: ComponentType) => void;
	onUpdateComponent: (componentIndex: number, newProps: any) => void;
	onRemoveComponent: (componentIndex: number) => void;
	onUpdateConfig: (newConfig: Partial<ContainerConfig>) => void;
	onAddSubContainer: () => void;
}) {
	return (
		<div
			className={`mb-8 p-4 border border-dashed border-gray-300 rounded-lg ${container.config.backgroundColor}`}
			style={{
				backgroundImage: container.config.backgroundImage
					? `url(${container.config.backgroundImage})`
					: "none",
				padding: container.config.padding,
				margin: container.config.margin,
			}}
		>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-semibold">
					Container {containerIndex + 1}
				</h2>
				<div className="flex space-x-2">
					<ContainerConfigDialog
						config={container.config}
						onUpdate={onUpdateConfig}
					/>
					<AddComponentButton
						onAddComponent={onAddComponent}
						disabled={container.components.length >= 4}
						onAddSubContainer={onAddSubContainer}
					/>
				</div>
			</div>
			<div
				className={`flex ${container.config.alignment} ${container.config.justifyContent} ${container.config.alignItems} gap-4`}
			>
				{container.components.map((component, componentIndex) => (
					<div key={componentIndex} className="relative w-full">
						<Button
							variant="outline"
							size="icon"
							className="absolute top-2 right-2 z-10"
							onClick={() => onRemoveComponent(componentIndex)}
						>
							<X className="h-4 w-4" />
						</Button>
						{component.type === "container" ? (
							<ContainerComponent
								container={component.props}
								containerIndex={componentIndex}
								onAddComponent={(type) => onAddComponent(type)}
								onUpdateComponent={(subComponentIndex, newProps) =>
									onUpdateComponent(componentIndex, {
										components: component.props.components.map(
											(c: any, i: number) =>
												i === subComponentIndex
													? { ...c, props: { ...c.props, ...newProps } }
													: c,
										),
									})
								}
								onRemoveComponent={(subComponentIndex) =>
									onUpdateComponent(componentIndex, {
										components: component.props.components.filter(
											(_: any, i: number) => i !== subComponentIndex,
										),
									})
								}
								onUpdateConfig={(newConfig) =>
									onUpdateComponent(componentIndex, {
										config: { ...component.props.config, ...newConfig },
									})
								}
								onAddSubContainer={() => {}}
							/>
						) : (
							<ComponentRenderer
								component={component}
								onUpdate={(newProps) =>
									onUpdateComponent(componentIndex, newProps)
								}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

function Header({
	config,
	onConfigUpdate,
}: {
	config: HeaderConfig;
	onConfigUpdate: (newConfig: HeaderConfig) => void;
}) {
	return (
		<header className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
			<Image
				src={config.logo}
				alt="Logo"
				width={100}
				height={100}
				className="h-8"
			/>
			<nav>
				{config.navItems.map((item, index) =>
					item.subItems ? (
						<Popover key={index}>
							<PopoverTrigger asChild>
								<Button variant="ghost" className="mx-1">
									{item.label} <ChevronDown className="ml-1 h-4 w-4" />
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								{item.subItems.map((subItem, subIndex) => (
									<Button
										key={subIndex}
										variant="ghost"
										className="w-full justify-start"
									>
										{subItem.label}
									</Button>
								))}
							</PopoverContent>
						</Popover>
					) : item.isList ? (
						<Popover key={index}>
							<PopoverTrigger asChild>
								<Button variant="ghost" className="mx-1">
									{item.label} <ChevronRight className="ml-1 h-4 w-4" />
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								<ul className="list-disc list-inside">
									<li>List Item 1</li>
									<li>List Item 2</li>
									<li>List Item 3</li>
								</ul>
							</PopoverContent>
						</Popover>
					) : (
						<Button key={index} variant="ghost" className="mx-1">
							{item.label}
						</Button>
					),
				)}
			</nav>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline" size="icon">
						<Settings className="h-4 w-4" />
						<span className="sr-only">Header settings</span>
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Header Configuration</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<div>
							<Label htmlFor="logo">Logo URL</Label>
							<Input
								id="logo"
								value={config.logo}
								onChange={(e) =>
									onConfigUpdate({ ...config, logo: e.target.value })
								}
							/>
						</div>
						<div>
							<Label>Navigation Items</Label>
							{config.navItems.map((item, index) => (
								<div key={index} className="flex items-center space-x-2 mt-2">
									<Input
										value={item.label}
										onChange={(e) => {
											const newNavItems = [...config.navItems];
											newNavItems[index] = {
												...newNavItems[index],
												label: e.target.value,
											};
											onConfigUpdate({ ...config, navItems: newNavItems });
										}}
										placeholder="Label"
									/>
									<Input
										value={item.href}
										onChange={(e) => {
											const newNavItems = [...config.navItems];
											newNavItems[index] = {
												...newNavItems[index],
												href: e.target.value,
											};
											onConfigUpdate({ ...config, navItems: newNavItems });
										}}
										placeholder="Link"
									/>
									<Switch
										checked={item.isList || false}
										onCheckedChange={(checked) => {
											const newNavItems = [...config.navItems];
											newNavItems[index] = {
												...newNavItems[index],
												isList: checked,
											};
											onConfigUpdate({ ...config, navItems: newNavItems });
										}}
									/>
									<Label htmlFor={`isList-${index}`}>List</Label>
									<Button
										variant="outline"
										size="icon"
										onClick={() => {
											const newNavItems = config.navItems.filter(
												(_, i) => i !== index,
											);
											onConfigUpdate({ ...config, navItems: newNavItems });
										}}
									>
										<X className="h-4 w-4" />
									</Button>
								</div>
							))}
							<Button
								onClick={() =>
									onConfigUpdate({
										...config,
										navItems: [
											...config.navItems,
											{ label: "New Item", href: "#" },
										],
									})
								}
								className="mt-2"
							>
								Add Nav Item
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</header>
	);
}

function Footer() {
	return (
		<footer className="bg-primary text-primary-foreground p-4 text-center">
			<p>&copy; 2024 Your Company. All rights reserved.</p>
		</footer>
	);
}

function ContainerConfigDialog({
	config,
	onUpdate,
}: {
	config: ContainerConfig;
	onUpdate: (newConfig: Partial<ContainerConfig>) => void;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					<Settings className="h-4 w-4 mr-2" />
					Config
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Container Configuration</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<div>
						<Label htmlFor="backgroundColor">Background Color</Label>
						<div className="flex space-x-2">
							<Select
								onValueChange={(value) => onUpdate({ backgroundColor: value })}
								defaultValue={config.backgroundColor}
							>
								<SelectTrigger id="backgroundColor">
									<SelectValue placeholder="Select a color" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="bg-white">White</SelectItem>
									<SelectItem value="bg-gray-100">Light Gray</SelectItem>
									<SelectItem value="bg-blue-100">Light Blue</SelectItem>
									<SelectItem value="bg-green-100">Light Green</SelectItem>
									<SelectItem value="bg-red-100">Light Red</SelectItem>
								</SelectContent>
							</Select>
							<Input
								type="text"
								placeholder="RGB or Hex"
								onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
							/>
						</div>
					</div>
					<div>
						<Label htmlFor="backgroundImage">Background Image URL</Label>
						<Input
							id="backgroundImage"
							value={config.backgroundImage}
							onChange={(e) => onUpdate({ backgroundImage: e.target.value })}
							placeholder="https://example.com/image.jpg"
						/>
					</div>
					<div>
						<Label htmlFor="alignment">Alignment</Label>
						<div className="flex space-x-2">
							<Select
								onValueChange={(value) =>
									onUpdate({ alignment: value as "flex-col" | "flex-row" })
								}
								defaultValue={config.alignment}
							>
								<SelectTrigger id="alignment">
									<SelectValue placeholder="Select alignment" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="flex-col">Vertical</SelectItem>
									<SelectItem value="flex-row">Horizontal</SelectItem>
								</SelectContent>
							</Select>
							<Input
								type="text"
								placeholder="Custom alignment"
								onChange={(e) =>
									onUpdate({
										alignment: e.target.value as "flex-col" | "flex-row",
									})
								}
							/>
						</div>
					</div>
					<div>
						<Label htmlFor="justifyContent">Justify Content</Label>
						<div className="flex space-x-2">
							<Select
								onValueChange={(value) => onUpdate({ justifyContent: value })}
								defaultValue={config.justifyContent}
							>
								<SelectTrigger id="justifyContent">
									<SelectValue placeholder="Select justify content" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="justify-start">Start</SelectItem>
									<SelectItem value="justify-center">Center</SelectItem>
									<SelectItem value="justify-end">End</SelectItem>
									<SelectItem value="justify-between">Space Between</SelectItem>
									<SelectItem value="justify-around">Space Around</SelectItem>
								</SelectContent>
							</Select>
							<Input
								type="text"
								placeholder="Custom justify"
								onChange={(e) => onUpdate({ justifyContent: e.target.value })}
							/>
						</div>
					</div>
					<div>
						<Label htmlFor="alignItems">Align Items</Label>
						<div className="flex space-x-2">
							<Select
								onValueChange={(value) => onUpdate({ alignItems: value })}
								defaultValue={config.alignItems}
							>
								<SelectTrigger id="alignItems">
									<SelectValue placeholder="Select align items" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="items-start">Start</SelectItem>
									<SelectItem value="items-center">Center</SelectItem>
									<SelectItem value="items-end">End</SelectItem>
									<SelectItem value="items-stretch">Stretch</SelectItem>
								</SelectContent>
							</Select>
							<Input
								type="text"
								placeholder="Custom align"
								onChange={(e) => onUpdate({ alignItems: e.target.value })}
							/>
						</div>
					</div>
					<div>
						<Label htmlFor="padding">Padding (top right bottom left)</Label>
						<Input
							id="padding"
							value={config.padding}
							onChange={(e) => onUpdate({ padding: e.target.value })}
							placeholder="0px 0px 0px 0px"
						/>
					</div>
					<div>
						<Label htmlFor="margin">Margin (top right bottom left)</Label>
						<Input
							id="margin"
							value={config.margin}
							onChange={(e) => onUpdate({ margin: e.target.value })}
							placeholder="0px 0px 0px 0px"
						/>
					</div>
					<div>
						<Label htmlFor="width">Width</Label>
						<div className="flex space-x-2">
							<Select
								onValueChange={(value) => onUpdate({ width: value })}
								defaultValue={config.width}
							>
								<SelectTrigger id="width">
									<SelectValue placeholder="Select width" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="w-full">Full</SelectItem>
									<SelectItem value="w-1/2">Half</SelectItem>
									<SelectItem value="w-1/3">One Third</SelectItem>
									<SelectItem value="w-2/3">Two Thirds</SelectItem>
									<SelectItem value="w-1/4">One Quarter</SelectItem>
									<SelectItem value="w-3/4">Three Quarters</SelectItem>
								</SelectContent>
							</Select>
							<Input
								type="text"
								placeholder="Custom width"
								onChange={(e) => onUpdate({ width: e.target.value })}
							/>
						</div>
					</div>
					<div>
						<Label htmlFor="height">Height</Label>
						<div className="flex space-x-2">
							<Select
								onValueChange={(value) => onUpdate({ height: value })}
								defaultValue={config.height}
							>
								<SelectTrigger id="height">
									<SelectValue placeholder="Select height" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="h-auto">Auto</SelectItem>
									<SelectItem value="h-full">Full</SelectItem>
									<SelectItem value="h-screen">Screen</SelectItem>
									<SelectItem value="h-64">Fixed (16rem)</SelectItem>
								</SelectContent>
							</Select>
							<Input
								type="text"
								placeholder="Custom height"
								onChange={(e) => onUpdate({ height: e.target.value })}
							/>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

function AddComponentButton({
	onAddComponent,
	disabled,
	onAddSubContainer,
}: {
	onAddComponent: (type: ComponentType) => void;
	disabled: boolean;
	onAddSubContainer: () => void;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button disabled={disabled}>Add Component</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Component</DialogTitle>
				</DialogHeader>
				<div className="grid grid-cols-2 gap-4">
					{(
						[
							"paragraph",
							"button",
							"image",
							"video",
							"carousel",
							"form",
							"table",
						] as ComponentType[]
					).map((type) => (
						<Button
							key={type}
							onClick={() => onAddComponent(type)}
							className="h-20 text-lg capitalize"
						>
							{type}
						</Button>
					))}
					<Button
						onClick={onAddSubContainer}
						className="h-20 text-lg capitalize"
					>
						Sub-Container
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

function ComponentRenderer({
	component,
	onUpdate,
}: {
	component: Component;
	onUpdate: (newProps: any) => void;
}) {
	switch (component.type) {
		case "paragraph":
			return <ParagraphComponent {...component.props} onUpdate={onUpdate} />;
		case "button":
			return <ButtonComponent {...component.props} onUpdate={onUpdate} />;
		case "image":
			return <ImageComponent {...component.props} onUpdate={onUpdate} />;
		case "video":
			return <VideoComponent {...component.props} onUpdate={onUpdate} />;
		case "carousel":
			return <CarouselComponent {...component.props} onUpdate={onUpdate} />;
		case "form":
			return <FormComponent {...component.props} onUpdate={onUpdate} />;
		case "table":
			return <TableComponent {...component.props} onUpdate={onUpdate} />;
		default:
			return null;
	}
}

function ParagraphComponent({
	content,
	font,
	fontSize,
	alignment,
	bold,
	italic,
	underline,
	textColor,
	backgroundColor,
	padding,
	margin,
	onUpdate,
}: {
	content: string;
	font: string;
	fontSize: number;
	alignment: string;
	bold: boolean;
	italic: boolean;
	underline: boolean;
	textColor: string;
	backgroundColor: string;
	padding: string;
	margin: string;
	onUpdate: (newProps: any) => void;
}) {
	return (
		<div className="space-y-2">
			<Textarea
				value={content}
				onChange={(e) => onUpdate({ content: e.target.value })}
				className="w-full mb-2"
			/>
			<div className="flex flex-wrap gap-2">
				<div className="flex space-x-2">
					<Select
						onValueChange={(value) => onUpdate({ font: value })}
						value={font}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select font" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="font-sans">Sans-serif</SelectItem>
							<SelectItem value="font-serif">Serif</SelectItem>
							<SelectItem value="font-mono">Monospace</SelectItem>
						</SelectContent>
					</Select>
					<Input
						type="text"
						placeholder="Custom font"
						onChange={(e) => onUpdate({ font: e.target.value })}
					/>
				</div>
				<Input
					type="number"
					value={fontSize}
					onChange={(e) => onUpdate({ fontSize: parseInt(e.target.value) })}
					className="w-20"
					placeholder="Font size"
				/>
				<div className="flex space-x-2">
					<Select
						onValueChange={(value) => onUpdate({ alignment: value })}
						value={alignment}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Alignment" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="text-left">Left</SelectItem>
							<SelectItem value="text-center">Center</SelectItem>
							<SelectItem value="text-right">Right</SelectItem>
						</SelectContent>
					</Select>
					<Input
						type="text"
						placeholder="Custom alignment"
						onChange={(e) => onUpdate({ alignment: e.target.value })}
					/>
				</div>
				<div className="flex items-center space-x-2">
					<Switch
						checked={bold}
						onCheckedChange={(checked) => onUpdate({ bold: checked })}
						id="bold"
					/>
					<Label htmlFor="bold">Bold</Label>
				</div>
				<div className="flex items-center space-x-2">
					<Switch
						checked={italic}
						onCheckedChange={(checked) => onUpdate({ italic: checked })}
						id="italic"
					/>
					<Label htmlFor="italic">Italic</Label>
				</div>
				<div className="flex items-center space-x-2">
					<Switch
						checked={underline}
						onCheckedChange={(checked) => onUpdate({ underline: checked })}
						id="underline"
					/>
					<Label htmlFor="underline">Underline</Label>
				</div>
			</div>
			<div className="flex flex-wrap gap-2">
				<div className="flex space-x-2">
					<Select
						onValueChange={(value) => onUpdate({ textColor: value })}
						value={textColor}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Text color" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="text-gray-900">Black</SelectItem>
							<SelectItem value="text-white">White</SelectItem>
							<SelectItem value="text-blue-500">Blue</SelectItem>
							<SelectItem value="text-green-500">Green</SelectItem>
							<SelectItem value="text-red-500">Red</SelectItem>
						</SelectContent>
					</Select>
					<Input
						type="text"
						placeholder="RGB or Hex"
						onChange={(e) => onUpdate({ textColor: e.target.value })}
					/>
				</div>
				<div className="flex space-x-2">
					<Select
						onValueChange={(value) => onUpdate({ backgroundColor: value })}
						value={backgroundColor}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Background color" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="bg-transparent">Transparent</SelectItem>
							<SelectItem value="bg-white">White</SelectItem>
							<SelectItem value="bg-gray-100">Light Gray</SelectItem>
							<SelectItem value="bg-blue-100">Light Blue</SelectItem>
							<SelectItem value="bg-green-100">Light Green</SelectItem>
							<SelectItem value="bg-red-100">Light Red</SelectItem>
						</SelectContent>
					</Select>
					<Input
						type="text"
						placeholder="RGB or Hex"
						onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
					/>
				</div>
				<Input
					value={padding}
					onChange={(e) => onUpdate({ padding: e.target.value })}
					placeholder="Padding (top right bottom left)"
					className="w-full"
				/>
				<Input
					value={margin}
					onChange={(e) => onUpdate({ margin: e.target.value })}
					placeholder="Margin (top right bottom left)"
					className="w-full"
				/>
			</div>
		</div>
	);
}

function ButtonComponent({
	text,
	link,
	font,
	fontSize,
	alignment,
	bold,
	italic,
	underline,
	textColor,
	backgroundColor,
	padding,
	margin,
	width,
	onUpdate,
}: {
	text: string;
	link: string;
	font: string;
	fontSize: number;
	alignment: string;
	bold: boolean;
	italic: boolean;
	underline: boolean;
	textColor: string;
	backgroundColor: string;
	padding: string;
	margin: string;
	width: string;
	onUpdate: (newProps: any) => void;
}) {
	return (
		<div className="space-y-2">
			<Input
				value={text}
				onChange={(e) => onUpdate({ text: e.target.value })}
				placeholder="Button text"
				className="mb-2"
			/>
			<Input
				value={link}
				onChange={(e) => onUpdate({ link: e.target.value })}
				placeholder="Button link"
				className="mb-2"
			/>
			<div className="flex flex-wrap gap-2">
				<div className="flex space-x-2">
					<Select
						onValueChange={(value) => onUpdate({ font: value })}
						value={font}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select font" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="font-sans">Sans-serif</SelectItem>
							<SelectItem value="font-serif">Serif</SelectItem>
							<SelectItem value="font-mono">Monospace</SelectItem>
						</SelectContent>
					</Select>
					<Input
						type="text"
						placeholder="Custom font"
						onChange={(e) => onUpdate({ font: e.target.value })}
					/>
				</div>
				<Input
					type="number"
					value={fontSize}
					onChange={(e) => onUpdate({ fontSize: parseInt(e.target.value) })}
					className="w-20"
					placeholder="Font size"
				/>
				<div className="flex space-x-2">
					<Select
						onValueChange={(value) => onUpdate({ alignment: value })}
						value={alignment}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Alignment" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="text-left">Left</SelectItem>
							<SelectItem value="text-center">Center</SelectItem>
							<SelectItem value="text-right">Right</SelectItem>
						</SelectContent>
					</Select>
					<Input
						type="text"
						placeholder="Custom alignment"
						onChange={(e) => onUpdate({ alignment: e.target.value })}
					/>
				</div>
				<div className="flex items-center space-x-2">
					<Switch
						checked={bold}
						onCheckedChange={(checked) => onUpdate({ bold: checked })}
						id="bold"
					/>
					<Label htmlFor="bold">Bold</Label>
				</div>
				<div className="flex items-center space-x-2">
					<Switch
						checked={italic}
						onCheckedChange={(checked) => onUpdate({ italic: checked })}
						id="italic"
					/>
					<Label htmlFor="italic">Italic</Label>
				</div>
				<div className="flex items-center space-x-2">
					<Switch
						checked={underline}
						onCheckedChange={(checked) => onUpdate({ underline: checked })}
						id="underline"
					/>
					<Label htmlFor="underline">Underline</Label>
				</div>
			</div>
			<div className="flex flex-wrap gap-2">
				<div className="flex space-x-2">
					<Select
						onValueChange={(value) => onUpdate({ textColor: value })}
						value={textColor}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Text color" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="text-white">White</SelectItem>
							<SelectItem value="text-gray-900">Black</SelectItem>
							<SelectItem value="text-blue-500">Blue</SelectItem>
							<SelectItem value="text-green-500">Green</SelectItem>
							<SelectItem value="text-red-500">Red</SelectItem>
						</SelectContent>
					</Select>
					<Input
						type="text"
						placeholder="RGB or Hex"
						onChange={(e) => onUpdate({ textColor: e.target.value })}
					/>
				</div>
				<div className="flex space-x-2">
					<Select
						onValueChange={(value) => onUpdate({ backgroundColor: value })}
						value={backgroundColor}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Background color" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="bg-blue-500">Blue</SelectItem>
							<SelectItem value="bg-green-500">Green</SelectItem>
							<SelectItem value="bg-red-500">Red</SelectItem>
							<SelectItem value="bg-gray-500">Gray</SelectItem>
							<SelectItem value="bg-transparent">Transparent</SelectItem>
						</SelectContent>
					</Select>
					<Input
						type="text"
						placeholder="RGB or Hex"
						onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
					/>
				</div>
				<Input
					value={padding}
					onChange={(e) => onUpdate({ padding: e.target.value })}
					placeholder="Padding (top right bottom left)"
					className="w-full"
				/>
				<Input
					value={margin}
					onChange={(e) => onUpdate({ margin: e.target.value })}
					placeholder="Margin (top right bottom left)"
					className="w-full"
				/>
				<div className="flex space-x-2">
					<Select
						onValueChange={(value) => onUpdate({ width: value })}
						value={width}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Width" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="w-auto">Auto</SelectItem>
							<SelectItem value="w-full">Full</SelectItem>
							<SelectItem value="w-1/2">Half</SelectItem>
							<SelectItem value="w-1/3">One Third</SelectItem>
							<SelectItem value="w-2/3">Two Thirds</SelectItem>
						</SelectContent>
					</Select>
					<Input
						type="text"
						placeholder="Custom width"
						onChange={(e) => onUpdate({ width: e.target.value })}
					/>
				</div>
			</div>
			<Button
				className={`${font} text-${fontSize} ${alignment} ${
					bold ? "font-bold" : ""
				} ${italic ? "italic" : ""} ${
					underline ? "underline" : ""
				} ${textColor} ${backgroundColor}`}
				style={{ padding, margin }}
			>
				{text}
			</Button>
		</div>
	);
}

function ImageComponent({
	src,
	alt,
	width,
	height,
	opacity,
	objectFit,
	onUpdate,
}: {
	src: string;
	alt: string;
	width: number;
	height: number;
	opacity: number;
	objectFit: string;
	onUpdate: (newProps: any) => void;
}) {
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				onUpdate({ src: reader.result as string });
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="space-y-2">
			<img
				src={src}
				alt={alt}
				className={`max-w-full h-auto mb-2 ${objectFit}`}
				style={{ width, height, opacity: opacity / 100 }}
			/>
			<Input
				type="file"
				onChange={handleFileChange}
				accept="image/*"
				className="mb-2"
			/>
			<Input
				value={src}
				onChange={(e) => onUpdate({ src: e.target.value })}
				placeholder="Image URL"
				className="mb-2"
			/>
			<Input
				value={alt}
				onChange={(e) => onUpdate({ alt: e.target.value })}
				placeholder="Alt text"
				className="mb-2"
			/>
			<div className="flex flex-wrap gap-2">
				<Input
					type="number"
					value={width}
					onChange={(e) => onUpdate({ width: parseInt(e.target.value) })}
					className="w-20"
					placeholder="Width"
				/>
				<Input
					type="number"
					value={height}
					onChange={(e) => onUpdate({ height: parseInt(e.target.value) })}
					className="w-20"
					placeholder="Height"
				/>
				<div className="flex items-center space-x-2">
					<Label htmlFor="opacity">Opacity</Label>
					<Slider
						id="opacity"
						min={0}
						max={100}
						step={1}
						value={[opacity]}
						onValueChange={([value]) => onUpdate({ opacity: value })}
						className="w-[100px]"
					/>
					<span>{opacity}%</span>
				</div>
				<Select
					onValueChange={(value) => onUpdate({ objectFit: value })}
					value={objectFit}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Object fit" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="object-cover">Cover</SelectItem>
						<SelectItem value="object-contain">Contain</SelectItem>
						<SelectItem value="object-fill">Fill</SelectItem>
						<SelectItem value="object-none">None</SelectItem>
						<SelectItem value="object-scale-down">Scale Down</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}

function VideoComponent({
	src,
	width,
	height,
	autoplay,
	muted,
	defaultSize,
	controls,
	onUpdate,
}: {
	src: string;
	width: number;
	height: number;
	autoplay: boolean;
	muted: boolean;
	defaultSize: boolean;
	controls: boolean;
	onUpdate: (newProps: any) => void;
}) {
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				onUpdate({ src: reader.result as string });
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="space-y-2">
			<video
				controls={controls}
				className="w-full mb-2"
				src={src}
				autoPlay={autoplay}
				muted={muted}
				style={defaultSize ? {} : { width, height }}
			>
				Your browser does not support the video tag.
			</video>
			<Input
				type="file"
				onChange={handleFileChange}
				accept="video/*"
				className="mb-2"
			/>
			<Input
				value={src}
				onChange={(e) => onUpdate({ src: e.target.value })}
				placeholder="Video URL"
				className="mb-2"
			/>
			<div className="flex flex-wrap gap-2">
				<Input
					type="number"
					value={width}
					onChange={(e) => onUpdate({ width: parseInt(e.target.value) })}
					className="w-20"
					placeholder="Width"
					disabled={defaultSize}
				/>
				<Input
					type="number"
					value={height}
					onChange={(e) => onUpdate({ height: parseInt(e.target.value) })}
					className="w-20"
					placeholder="Height"
					disabled={defaultSize}
				/>
				<div className="flex items-center space-x-2">
					<Switch
						checked={autoplay}
						onCheckedChange={(checked) => onUpdate({ autoplay: checked })}
						id="autoplay"
					/>
					<Label htmlFor="autoplay">Autoplay</Label>
				</div>
				<div className="flex items-center space-x-2">
					<Switch
						checked={muted}
						onCheckedChange={(checked) => onUpdate({ muted: checked })}
						id="muted"
					/>
					<Label htmlFor="muted">Muted</Label>
				</div>
				<div className="flex items-center space-x-2">
					<Switch
						checked={defaultSize}
						onCheckedChange={(checked) => onUpdate({ defaultSize: checked })}
						id="defaultSize"
					/>
					<Label htmlFor="defaultSize">Default Size</Label>
				</div>
				<div className="flex items-center space-x-2">
					<Switch
						checked={controls}
						onCheckedChange={(checked) => onUpdate({ controls: checked })}
						id="controls"
					/>
					<Label htmlFor="controls">Show Controls</Label>
				</div>
			</div>
		</div>
	);
}

function CarouselComponent({
	items,
	slideCount,
	showText,
	showLinks,
	showButtons,
	isCardType,
	autoPlay,
	interval,
	visibleSlides,
	onUpdate,
}: {
	items: any[];
	slideCount: number;
	showText: boolean;
	showLinks: boolean;
	showButtons: boolean;
	isCardType: boolean;
	autoPlay: boolean;
	interval: number;
	visibleSlides: number;
	onUpdate: (newProps: any) => void;
}) {
	const addSlide = () => {
		const newItems = [
			...items,
			{
				image: "/placeholder.svg?height=200&width=300",
				text: "",
				link: "",
				buttonText: "",
			},
		];
		onUpdate({
			items: newItems,
			slideCount: Math.min(newItems.length, slideCount + 1),
		});
	};

	const updateSlide = (index: number, field: string, value: string) => {
		const newItems = [...items];
		newItems[index] = { ...newItems[index], [field]: value };
		onUpdate({ items: newItems });
	};

	const removeSlide = (index: number) => {
		const newItems = items.filter((_, i) => i !== index);
		onUpdate({
			items: newItems,
			slideCount: Math.min(newItems.length, slideCount),
		});
	};

	return (
		<div className="space-y-4">
			<Carousel className="w-full max-w-xs mx-auto">
				<CarouselContent>
					{items.slice(0, slideCount).map((item, index) => (
						<CarouselItem key={index}>
							{isCardType ? (
								<Card>
									<CardHeader>
										<CardTitle>{item.text}</CardTitle>
									</CardHeader>
									<CardContent>
										<img
											src={item.image}
											alt={`Slide ${index + 1}`}
											className="w-full h-auto"
										/>
									</CardContent>
									{showLinks && (
										<CardFooter>
											<a
												href={item.link}
												className="text-blue-500 hover:underline"
											>
												{item.link}
											</a>
										</CardFooter>
									)}
									{showButtons && (
										<CardFooter>
											<Button>{item.buttonText}</Button>
										</CardFooter>
									)}
								</Card>
							) : (
								<div className="relative">
									<img
										src={item.image}
										alt={`Slide ${index + 1}`}
										className="w-full h-auto"
									/>
									{showText && (
										<p className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2">
											{item.text}
										</p>
									)}
									{showLinks && (
										<a
											href={item.link}
											className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded"
										>
											Link
										</a>
									)}
									{showButtons && (
										<Button className="absolute bottom-4 right-4">
											{item.buttonText}
										</Button>
									)}
								</div>
							)}
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<div className="space-y-2">
				{items.map((item, index) => (
					<div key={index} className="flex items-center space-x-2">
						<Input
							value={item.image}
							onChange={(e) => updateSlide(index, "image", e.target.value)}
							placeholder={`Image URL ${index + 1}`}
						/>
						{showText && (
							<Input
								value={item.text}
								onChange={(e) => updateSlide(index, "text", e.target.value)}
								placeholder="Text"
							/>
						)}
						{showLinks && (
							<Input
								value={item.link}
								onChange={(e) => updateSlide(index, "link", e.target.value)}
								placeholder="Link"
							/>
						)}
						{showButtons && (
							<Input
								value={item.buttonText}
								onChange={(e) =>
									updateSlide(index, "buttonText", e.target.value)
								}
								placeholder="Button Text"
							/>
						)}
						<Button
							variant="outline"
							size="icon"
							onClick={() => removeSlide(index)}
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				))}
				<Button onClick={addSlide}>Add Slide</Button>
			</div>
			<div className="flex flex-wrap gap-2">
				<Input
					type="number"
					value={slideCount}
					onChange={(e) =>
						onUpdate({
							slideCount: Math.min(parseInt(e.target.value), items.length),
						})
					}
					className="w-20"
					placeholder="Slide Count"
				/>
				<div className="flex items-center space-x-2">
					<Switch
						checked={showText}
						onCheckedChange={(checked) => onUpdate({ showText: checked })}
						id="showText"
					/>
					<Label htmlFor="showText">Show Text</Label>
				</div>
				<div className="flex items-center space-x-2">
					<Switch
						checked={showLinks}
						onCheckedChange={(checked) => onUpdate({ showLinks: checked })}
						id="showLinks"
					/>
					<Label htmlFor="showLinks">Show Links</Label>
				</div>
				<div className="flex items-center space-x-2">
					<Switch
						checked={showButtons}
						onCheckedChange={(checked) => onUpdate({ showButtons: checked })}
						id="showButtons"
					/>
					<Label htmlFor="showButtons">Show Buttons</Label>
				</div>
				<div className="flex items-center space-x-2">
					<Switch
						checked={isCardType}
						onCheckedChange={(checked) => onUpdate({ isCardType: checked })}
						id="isCardType"
					/>
					<Label htmlFor="isCardType">Card Type</Label>
				</div>
				<div className="flex items-center space-x-2">
					<Switch
						checked={autoPlay}
						onCheckedChange={(checked) => onUpdate({ autoPlay: checked })}
						id="autoPlay"
					/>
					<Label htmlFor="autoPlay">Auto Play</Label>
				</div>
				<Input
					type="number"
					value={interval}
					onChange={(e) => onUpdate({ interval: parseInt(e.target.value) })}
					className="w-20"
					placeholder="Interval (ms)"
				/>
				<Input
					type="number"
					value={visibleSlides}
					onChange={(e) =>
						onUpdate({ visibleSlides: parseInt(e.target.value) })
					}
					className="w-20"
					placeholder="Visible Slides"
				/>
			</div>
		</div>
	);
}

function FormComponent({
	title,
	subtitle,
	font,
	fontSize,
	alignment,
	fields,
	buttonText,
	buttonColor,
	buttonTextColor,
	onUpdate,
}: {
	title: string;
	subtitle: string;
	font: string;
	fontSize: number;
	alignment: string;
	fields: { label: string; type: string }[];
	buttonText: string;
	buttonColor: string;
	buttonTextColor: string;
	onUpdate: (newProps: any) => void;
}) {
	const addField = () => {
		onUpdate({ fields: [...fields, { label: "New Field", type: "text" }] });
	};

	return (
		<div className="space-y-4">
			<Input
				value={title}
				onChange={(e) => onUpdate({ title: e.target.value })}
				placeholder="Form Title"
				className="mb-2"
			/>
			<Input
				value={subtitle}
				onChange={(e) => onUpdate({ subtitle: e.target.value })}
				placeholder="Form Subtitle"
				className="mb-2"
			/>
			<div className="flex flex-wrap gap-2">
				<div className="flex space-x-2">
					<Select
						onValueChange={(value) => onUpdate({ font: value })}
						value={font}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select font" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="font-sans">Sans-serif</SelectItem>
							<SelectItem value="font-serif">Serif</SelectItem>
							<SelectItem value="font-mono">Monospace</SelectItem>
						</SelectContent>
					</Select>
					<Input
						type="text"
						placeholder="Custom font"
						onChange={(e) => onUpdate({ font: e.target.value })}
					/>
				</div>
				<Input
					type="number"
					value={fontSize}
					onChange={(e) => onUpdate({ fontSize: parseInt(e.target.value) })}
					className="w-20"
					placeholder="Font size"
				/>
				<div className="flex space-x-2">
					<Select
						onValueChange={(value) => onUpdate({ alignment: value })}
						value={alignment}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Alignment" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="text-left">Left</SelectItem>
							<SelectItem value="text-center">Center</SelectItem>
							<SelectItem value="text-right">Right</SelectItem>
						</SelectContent>
					</Select>
					<Input
						type="text"
						placeholder="Custom alignment"
						onChange={(e) => onUpdate({ alignment: e.target.value })}
					/>
				</div>
			</div>
			<div className="space-y-2">
				{fields.map((field, index) => (
					<div key={index} className="flex items-center space-x-2">
						<Input
							value={field.label}
							onChange={(e) => {
								const newFields = [...fields];
								newFields[index] = {
									...newFields[index],
									label: e.target.value,
								};
								onUpdate({ fields: newFields });
							}}
							placeholder="Field label"
						/>
						<Select
							onValueChange={(value) => {
								const newFields = [...fields];
								newFields[index] = { ...newFields[index], type: value };
								onUpdate({ fields: newFields });
							}}
							value={field.type}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Field type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="text">Text</SelectItem>
								<SelectItem value="email">Email</SelectItem>
								<SelectItem value="number">Number</SelectItem>
								<SelectItem value="textarea">Textarea</SelectItem>
							</SelectContent>
						</Select>
						<Button
							variant="outline"
							size="icon"
							onClick={() => {
								const newFields = fields.filter((_, i) => i !== index);
								onUpdate({ fields: newFields });
							}}
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				))}
			</div>
			<Button onClick={addField}>Add Field</Button>
			<div className="space-y-2">
				<Input
					value={buttonText}
					onChange={(e) => onUpdate({ buttonText: e.target.value })}
					placeholder="Submit Button Text"
				/>
				<div className="flex space-x-2">
					<Select
						onValueChange={(value) => onUpdate({ buttonColor: value })}
						value={buttonColor}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Button color" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="bg-blue-500">Blue</SelectItem>
							<SelectItem value="bg-green-500">Green</SelectItem>
							<SelectItem value="bg-red-500">Red</SelectItem>
							<SelectItem value="bg-gray-500">Gray</SelectItem>
						</SelectContent>
					</Select>
					<Input
						type="text"
						placeholder="RGB or Hex"
						onChange={(e) => onUpdate({ buttonColor: e.target.value })}
					/>
				</div>
				<div className="flex space-x-2">
					<Select
						onValueChange={(value) => onUpdate({ buttonTextColor: value })}
						value={buttonTextColor}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Button text color" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="text-white">White</SelectItem>
							<SelectItem value="text-black">Black</SelectItem>
						</SelectContent>
					</Select>
					<Input
						type="text"
						placeholder="RGB or Hex"
						onChange={(e) => onUpdate({ buttonTextColor: e.target.value })}
					/>
				</div>
			</div>
		</div>
	);
}

function TableComponent({
	rows,
	columns,
	headers,
	data,
	striped,
	hoverable,
	bordered,
	onUpdate,
}: {
	rows: number;
	columns: number;
	headers: string[];
	data: string[][];
	striped: boolean;
	hoverable: boolean;
	bordered: boolean;
	onUpdate: (newProps: any) => void;
}) {
	const updateHeader = (index: number, value: string) => {
		const newHeaders = [...headers];
		newHeaders[index] = value;
		onUpdate({ headers: newHeaders });
	};

	const updateCell = (rowIndex: number, colIndex: number, value: string) => {
		const newData = [...data];
		newData[rowIndex][colIndex] = value;
		onUpdate({ data: newData });
	};

	const addRow = () => {
		const newData = [...data, Array(columns).fill("")];
		onUpdate({ data: newData, rows: rows + 1 });
	};

	const addColumn = () => {
		const newHeaders = [...headers, `Header ${columns + 1}`];
		const newData = data.map((row) => [...row, ""]);
		onUpdate({ headers: newHeaders, data: newData, columns: columns + 1 });
	};

	return (
		<div className="space-y-4">
			<div className="flex space-x-2">
				<Button onClick={addRow}>Add Row</Button>
				<Button onClick={addColumn}>Add Column</Button>
			</div>
			<div className="flex space-x-2">
				<div className="flex items-center space-x-2">
					<Switch
						checked={striped}
						onCheckedChange={(checked) => onUpdate({ striped: checked })}
						id="striped"
					/>
					<Label htmlFor="striped">Striped</Label>
				</div>
				<div className="flex items-center space-x-2">
					<Switch
						checked={hoverable}
						onCheckedChange={(checked) => onUpdate({ hoverable: checked })}
						id="hoverable"
					/>
					<Label htmlFor="hoverable">Hoverable</Label>
				</div>
				<div className="flex items-center space-x-2">
					<Switch
						checked={bordered}
						onCheckedChange={(checked) => onUpdate({ bordered: checked })}
						id="bordered"
					/>
					<Label htmlFor="bordered">Bordered</Label>
				</div>
			</div>
			<Table
				className={`${striped ? "table-striped" : ""} ${
					hoverable ? "table-hover" : ""
				} ${bordered ? "table-bordered" : ""}`}
			>
				<TableHeader>
					<TableRow>
						{headers.map((header, index) => (
							<TableHead key={index}>
								<Input
									value={header}
									onChange={(e) => updateHeader(index, e.target.value)}
									className="w-full"
								/>
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((row, rowIndex) => (
						<TableRow key={rowIndex}>
							{row.map((cell, colIndex) => (
								<TableCell key={colIndex}>
									<Input
										value={cell}
										onChange={(e) =>
											updateCell(rowIndex, colIndex, e.target.value)
										}
										className="w-full"
									/>
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

function LandingPagePreview({
	headerConfig,
	containers,
}: {
	headerConfig: HeaderConfig;
	containers: Container[];
}) {
	return (
		<div className="space-y-8">
			<header className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
				<img src={headerConfig.logo} alt="Logo" className="h-8" />
				<nav>
					{headerConfig.navItems.map((item, index) => (
						<Button key={index} variant="ghost" className="mx-1">
							{item.label}
						</Button>
					))}
				</nav>
			</header>
			{containers.map((container, containerIndex) => (
				<div
					key={containerIndex}
					className={`p-4 ${container.config.backgroundColor} ${container.config.width} ${container.config.height}`}
					style={{
						backgroundImage: container.config.backgroundImage
							? `url(${container.config.backgroundImage})`
							: "none",
						padding: container.config.padding,
						margin: container.config.margin,
					}}
				>
					<div
						className={`flex ${container.config.alignment} ${container.config.justifyContent} ${container.config.alignItems} gap-4`}
					>
						{container.components.map((component, componentIndex) => (
							<div key={componentIndex} className="w-full">
								<PreviewComponent component={component} />
							</div>
						))}
					</div>
				</div>
			))}
			<footer className="bg-primary text-primary-foreground p-4 text-center">
				<p>&copy; 2024 Your Company. All rights reserved.</p>
			</footer>
		</div>
	);
}

function PreviewComponent({ component }: { component: Component }) {
	switch (component.type) {
		case "paragraph":
			return <PreviewParagraph {...component.props} />;
		case "button":
			return <PreviewButton {...component.props} />;
		case "image":
			return <PreviewImage {...component.props} />;
		case "video":
			return <PreviewVideo {...component.props} />;
		case "carousel":
			return <PreviewCarousel {...component.props} />;
		case "form":
			return <PreviewForm {...component.props} />;
		case "table":
			return <PreviewTable {...component.props} />;
		case "container":
			return <PreviewContainer {...component.props} />;
		default:
			return null;
	}
}

function PreviewParagraph({
	content,
	font,
	fontSize,
	alignment,
	bold,
	italic,
	underline,
	textColor,
	backgroundColor,
	padding,
	margin,
}: {
	content: string;
	font: string;
	fontSize: number;
	alignment: string;
	bold: boolean;
	italic: boolean;
	underline: boolean;
	textColor: string;
	backgroundColor: string;
	padding: string;
	margin: string;
}) {
	const style = {
		fontFamily: font,
		fontSize: `${fontSize}px`,
		textAlign: alignment as any,
		fontWeight: bold ? "bold" : "normal",
		fontStyle: italic ? "italic" : "normal",
		textDecoration: underline ? "underline" : "none",
		color: textColor,
		backgroundColor,
		padding,
		margin,
	};

	return <p style={style}>{content}</p>;
}

function PreviewButton({
	text,
	link,
	font,
	fontSize,
	alignment,
	bold,
	italic,
	underline,
	textColor,
	backgroundColor,
	padding,
	margin,
	width,
}: {
	text: string;
	link: string;
	font: string;
	fontSize: number;
	alignment: string;
	bold: boolean;
	italic: boolean;
	underline: boolean;
	textColor: string;
	backgroundColor: string;
	padding: string;
	margin: string;
	width: string;
}) {
	const style = {
		fontFamily: font,
		fontSize: `${fontSize}px`,
		textAlign: alignment as any,
		fontWeight: bold ? "bold" : "normal",
		fontStyle: italic ? "italic" : "normal",
		textDecoration: underline ? "underline" : "none",
		color: textColor,
		backgroundColor,
		padding,
		margin,
		width,
	};

	return (
		<div style={{ textAlign: alignment as any }}>
			<Button asChild style={style}>
				<a href={link}>{text}</a>
			</Button>
		</div>
	);
}

function PreviewImage({
	src,
	alt,
	width,
	height,
	opacity,
	objectFit,
}: {
	src: string;
	alt: string;
	width: number;
	height: number;
	opacity: number;
	objectFit: string;
}) {
	return (
		<img
			src={src}
			alt={alt}
			style={{ width, height, opacity: opacity / 100 }}
			className={`max-w-full h-auto ${objectFit}`}
		/>
	);
}

function PreviewVideo({
	src,
	width,
	height,
	autoplay,
	muted,
	defaultSize,
	controls,
}: {
	src: string;
	width: number;
	height: number;
	autoplay: boolean;
	muted: boolean;
	defaultSize: boolean;
	controls: boolean;
}) {
	return (
		<video
			controls={controls}
			src={src}
			autoPlay={autoplay}
			muted={muted}
			style={defaultSize ? {} : { width, height }}
			className="w-full"
		>
			Your browser does not support the video tag.
		</video>
	);
}

function PreviewCarousel({
	items,
	slideCount,
	showText,
	showLinks,
	showButtons,
	isCardType,
	autoPlay,
	interval,
	visibleSlides,
}: {
	items: any[];
	slideCount: number;
	showText: boolean;
	showLinks: boolean;
	showButtons: boolean;
	isCardType: boolean;
	autoPlay: boolean;
	interval: number;
	visibleSlides: number;
}) {
	return (
		<Carousel className="w-full max-w-xs mx-auto">
			<CarouselContent>
				{items.slice(0, slideCount).map((item, index) => (
					<CarouselItem key={index}>
						{isCardType ? (
							<Card>
								<CardHeader>
									<CardTitle>{item.text}</CardTitle>
								</CardHeader>
								<CardContent>
									<img
										src={item.image}
										alt={`Slide ${index + 1}`}
										className="w-full h-auto"
									/>
								</CardContent>
								{showLinks && (
									<CardFooter>
										<a
											href={item.link}
											className="text-blue-500 hover:underline"
										>
											{item.link}
										</a>
									</CardFooter>
								)}
								{showButtons && (
									<CardFooter>
										<Button>{item.buttonText}</Button>
									</CardFooter>
								)}
							</Card>
						) : (
							<div className="relative">
								<img
									src={item.image}
									alt={`Slide ${index + 1}`}
									className="w-full h-auto"
								/>
								{showText && (
									<p className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2">
										{item.text}
									</p>
								)}
								{showLinks && (
									<a
										href={item.link}
										className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded"
									>
										Link
									</a>
								)}
								{showButtons && (
									<Button className="absolute bottom-4 right-4">
										{item.buttonText}
									</Button>
								)}
							</div>
						)}
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}

function PreviewForm({
	title,
	subtitle,
	font,
	fontSize,
	alignment,
	fields,
	buttonText,
	buttonColor,
	buttonTextColor,
}: {
	title: string;
	subtitle: string;
	font: string;
	fontSize: number;
	alignment: string;
	fields: { label: string; type: string }[];
	buttonText: string;
	buttonColor: string;
	buttonTextColor: string;
}) {
	return (
		<form className={`${font} text-${fontSize}px ${alignment} space-y-4`}>
			<h2 className="text-2xl font-bold">{title}</h2>
			<p>{subtitle}</p>
			{fields.map((field, index) => (
				<div key={index} className="space-y-2">
					<Label htmlFor={`field-${index}`}>{field.label}</Label>
					{field.type === "textarea" ? (
						<Textarea id={`field-${index}`} placeholder={field.label} />
					) : (
						<Input
							id={`field-${index}`}
							type={field.type}
							placeholder={field.label}
						/>
					)}
				</div>
			))}
			<Button type="submit" className={`${buttonColor} ${buttonTextColor}`}>
				{buttonText}
			</Button>
		</form>
	);
}

function PreviewTable({
	rows,
	columns,
	headers,
	data,
	striped,
	hoverable,
	bordered,
}: {
	rows: number;
	columns: number;
	headers: string[];
	data: string[][];
	striped: boolean;
	hoverable: boolean;
	bordered: boolean;
}) {
	return (
		<Table
			className={`${striped ? "table-striped" : ""} ${
				hoverable ? "table-hover" : ""
			} ${bordered ? "table-bordered" : ""}`}
		>
			<TableHeader>
				<TableRow>
					{headers.map((header, index) => (
						<TableHead key={index}>{header}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((row, rowIndex) => (
					<TableRow key={rowIndex}>
						{row.map((cell, colIndex) => (
							<TableCell key={colIndex}>{cell}</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

function PreviewContainer({
	components,
	config,
}: {
	components: Component[];
	config: ContainerConfig;
}) {
	return (
		<div
			className={`p-4 ${config.backgroundColor} ${config.width} ${config.height}`}
			style={{
				backgroundImage: config.backgroundImage
					? `url(${config.backgroundImage})`
					: "none",
				padding: config.padding,
				margin: config.margin,
			}}
		>
			<div
				className={`flex ${config.alignment} ${config.justifyContent} ${config.alignItems} gap-4`}
			>
				{components.map((component, componentIndex) => (
					<div key={componentIndex} className="w-full">
						<PreviewComponent component={component} />
					</div>
				))}
			</div>
		</div>
	);
}
