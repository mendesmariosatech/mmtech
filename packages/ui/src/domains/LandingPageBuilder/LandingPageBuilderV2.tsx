"use client";

import React, { useState, useCallback } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../components/ui/tabs";
import {
	DragDropContext,
	Droppable,
	Draggable,
	DroppableStateSnapshot,
	DroppableProvided,
	DropResult,
} from "react-beautiful-dnd";
import {
	Monitor,
	Tablet,
	Smartphone,
	Eye,
	Code,
	Type,
	Image as ImageIcon,
	Layout,
	Box,
	Move,
	Undo,
	Redo,
	Save,
	Settings,
	Plus,
	Trash2,
	Copy,
	Bold,
	Italic,
	Underline,
	Link as LinkIcon,
	Sun,
	Moon,
	ChevronLeft,
	ChevronRight,
	List,
	CreditCard,
	ImagePlus,
	FileText,
} from "lucide-react";
import { CSSProperties } from "react";
import { Card } from "../../components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface BaseComponent {
	id: string;
	type:
		| "text"
		| "image"
		| "button"
		| "div"
		| "a"
		| "link"
		| "carousel"
		| "card"
		| "form"
		| "list";
	style: {
		width: string;
		height: string;
		backgroundColor?: string;
		color?: string;
		fontSize?: string;
		fontWeight?: string;
		textAlign?: string;
		padding?: string;
		margin?: string;
		borderRadius?: string;
		display?: string;
		flexDirection?: string;
		justifyContent?: string;
		alignItems?: string;
	};
}

interface TextComponent extends BaseComponent {
	type: "text" | "button" | "a" | "link" | "div";
	content: string;
}

interface ImageComponent extends BaseComponent {
	type: "image";
	content: string;
}

interface CarouselComponent extends BaseComponent {
	type: "carousel";
	content: string[];
}

interface CardComponent extends BaseComponent {
	type: "card";
	content: {
		title: string;
		content: string;
		image: string;
	};
}

interface FormComponent extends BaseComponent {
	type: "form";
	content: {
		fields: Array<{ type: string; label: string; placeholder: string }>;
		submitButton: string;
	};
}

interface ListComponent extends BaseComponent {
	type: "list";
	content: string[];
}

type Component =
	| TextComponent
	| ImageComponent
	| CarouselComponent
	| CardComponent
	| FormComponent
	| ListComponent;

interface Section {
	id: string;
	type: "header" | "content" | "footer";
	name: string;
	components: Component[];
	style: CSSProperties;
}

type DeviceType = "desktop" | "tablet" | "mobile";
function ComponentEditor({
	selectedComponent,
	onUpdateComponent,
}: {
	selectedComponent: Component | null;
	onUpdateComponent: (updates: Partial<Component>) => void;
}) {
	const [device, setDevice] = useState<DeviceType>("desktop");
	if (!selectedComponent) {
		return <div className="p-4">Selecione um componente para editar</div>;
	}

	const handleStyleChange = (property: string, value: string | number) => {
		onUpdateComponent({
			style: {
				...selectedComponent.style,
				[property]: value,
			},
		});
	};

	const handleContentChange = (value: string) => {
		onUpdateComponent({ content: value });
	};

	return (
		<div className="p-4 space-y-4">
			<h2 className="text-lg font-semibold">Editar Componente</h2>
			<Tabs defaultValue="content">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="content">Conteúdo</TabsTrigger>
					<TabsTrigger value="style">Estilo</TabsTrigger>
				</TabsList>
				<TabsContent value="content" className="space-y-4">
					{selectedComponent.type === "text" && (
						<div>
							<Label htmlFor="text-content">Texto</Label>
							<Input
								id="text-content"
								value={selectedComponent.content as string}
								onChange={(e) => handleContentChange(e.target.value)}
							/>
						</div>
					)}
					{selectedComponent.type === "button" && (
						<div>
							<Label htmlFor="button-text">Texto do Botão</Label>
							<Input
								id="button-text"
								value={selectedComponent.content as string}
								onChange={(e) => handleContentChange(e.target.value)}
							/>
						</div>
					)}
					{selectedComponent.type === "image" && (
						<div>
							<Label htmlFor="image-url">URL da Imagem</Label>
							<Input
								id="image-url"
								value={selectedComponent.content as string}
								onChange={(e) => handleContentChange(e.target.value)}
							/>
						</div>
					)}
				</TabsContent>
				<TabsContent value="style" className="space-y-4">
					<div>
						<Label htmlFor="width">Largura</Label>
						<Input
							id="width"
							value={selectedComponent.style.width}
							onChange={(e) => handleStyleChange("width", e.target.value)}
						/>
					</div>
					<div>
						<Label htmlFor="height">Altura</Label>
						<Input
							id="height"
							value={selectedComponent.style.height}
							onChange={(e) => handleStyleChange("height", e.target.value)}
						/>
					</div>
					<div>
						<Label htmlFor="background-color">Cor de Fundo</Label>
						<Input
							id="background-color"
							type="color"
							value={selectedComponent.style.backgroundColor || "#ffffff"}
							onChange={(e) =>
								handleStyleChange("backgroundColor", e.target.value)
							}
						/>
					</div>
					<div>
						<Label htmlFor="color">Cor do Texto</Label>
						<Input
							id="color"
							type="color"
							value={selectedComponent.style.color || "#000000"}
							onChange={(e) => handleStyleChange("color", e.target.value)}
						/>
					</div>
					<div>
						<Label htmlFor="font-size">Tamanho da Fonte</Label>
						<Select
							value={selectedComponent.style.fontSize || "16px"}
							onValueChange={(value) => handleStyleChange("fontSize", value)}
						>
							<SelectTrigger id="font-size">
								<SelectValue placeholder="Selecione o tamanho da fonte" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="12px">12px</SelectItem>
								<SelectItem value="14px">14px</SelectItem>
								<SelectItem value="16px">16px</SelectItem>
								<SelectItem value="18px">18px</SelectItem>
								<SelectItem value="20px">20px</SelectItem>
								<SelectItem value="24px">24px</SelectItem>
								<SelectItem value="32px">32px</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div>
						<Label htmlFor="font-weight">Peso da Fonte</Label>
						<Select
							value={selectedComponent.style.fontWeight || "normal"}
							onValueChange={(value) => handleStyleChange("fontWeight", value)}
						>
							<SelectTrigger id="font-weight">
								<SelectValue placeholder="Selecione o peso da fonte" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="normal">Normal</SelectItem>
								<SelectItem value="bold">Negrito</SelectItem>
								<SelectItem value="lighter">Leve</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div>
						<Label htmlFor="text-align">Alinhamento do Texto</Label>
						<Select
							value={selectedComponent.style.textAlign || "left"}
							onValueChange={(value) => handleStyleChange("textAlign", value)}
						>
							<SelectTrigger id="text-align">
								<SelectValue placeholder="Selecione o alinhamento do texto" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="left">Esquerda</SelectItem>
								<SelectItem value="center">Centro</SelectItem>
								<SelectItem value="right">Direita</SelectItem>
								<SelectItem value="justify">Justificado</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div>
						<Label htmlFor="padding">Padding</Label>
						<Input
							id="padding"
							value={selectedComponent.style.padding || "0px"}
							onChange={(e) => handleStyleChange("padding", e.target.value)}
						/>
					</div>
					<div>
						<Label htmlFor="margin">Margin</Label>
						<Input
							id="margin"
							value={selectedComponent.style.margin || "0px"}
							onChange={(e) => handleStyleChange("margin", e.target.value)}
						/>
					</div>
					<div>
						<Label htmlFor="border-radius">Border Radius</Label>
						<Input
							id="border-radius"
							value={selectedComponent.style.borderRadius || "0px"}
							onChange={(e) =>
								handleStyleChange("borderRadius", e.target.value)
							}
						/>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}

export function LandingPageBuilderV2() {
	const [darkMode, setDarkMode] = useState(true);
	const [device, setDevice] = useState("desktop");
	const [sections, setSections] = useState<Section[]>([
		{
			id: "header",
			type: "header",
			name: "Cabeçalho Padrão",
			components: [
				{
					id: "logo",
					type: "text",
					content: "Logo",
					style: {
						width: "auto",
						height: "auto",
						fontSize: "24px",
						fontWeight: "bold",
						color: "#ffffff",
					},
				},
				{
					id: "nav",
					type: "div",
					content: "",
					style: {
						width: "100%",
						height: "auto",
						display: "flex",
						justifyContent: "flex-end",
					},
				},
			],
			style: { backgroundColor: "#1a1a1a", padding: "16px" },
		},
		{
			id: "1",
			type: "content",
			name: "Conteúdo Principal",
			components: [
				{
					id: "c1",
					type: "text",
					content: "Bem-vindo ao Criador de Páginas",
					style: {
						width: "100%",
						height: "auto",
						fontSize: "32px",
						fontWeight: "bold",
						textAlign: "center",
						color: "#333333",
						margin: "20px 0",
					},
				},
				{
					id: "c2",
					type: "button",
					content: "Começar",
					style: {
						width: "auto",
						height: "auto",
						backgroundColor: "#4CAF50",
						color: "#ffffff",
						padding: "10px 20px",
						borderRadius: "5px",
						margin: "10px auto",
						display: "block",
					},
				},
			],
			style: { backgroundColor: "#ffffff", padding: "24px" },
		},
		{
			id: "footer",
			type: "footer",
			name: "Rodapé Padrão",
			components: [
				{
					id: "footerText",
					type: "text",
					content: "© 2024 Criador de Páginas. Todos os direitos reservados.",
					style: {
						width: "100%",
						height: "auto",
						fontSize: "14px",
						color: "#ffffff",
						textAlign: "center",
					},
				},
			],
			style: { backgroundColor: "#333333", padding: "16px" },
		},
	]);
	const [selectedSection, setSelectedSection] = useState<string | undefined>(
		sections[0]?.id,
	);
	const [selectedComponent, setSelectedComponent] = useState<Component | null>(
		null,
	);
	const [showLeftSidebar, setShowLeftSidebar] = useState(true);
	const [showRightSidebar, setShowRightSidebar] = useState(true);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	const addSection = () => {
		const newSection: Section = {
			id: Date.now().toString(),
			type: "content",
			name: `Nova Seção ${sections.length + 1}`,
			components: [],
			style: {
				backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
				padding: "24px",
			},
		};
		setSections([...sections, newSection]);
		setSelectedSection(newSection.id);
	};

	const addComponent = (sectionId: string, type: Component["type"]) => {
		let newComponent: Component;

		switch (type) {
			case "text":
				newComponent = {
					id: Date.now().toString(),
					type,
					content: "Novo texto",
					style: { width: "100%", height: "auto" },
				};
				break;
			case "button":
				newComponent = {
					id: Date.now().toString(),
					type,
					content: "Novo botão",
					style: {
						width: "100%",
						height: "auto",
						backgroundColor: "#4CAF50",
						color: "#ffffff",
						padding: "10px 20px",
						borderRadius: "5px",
						display: "inline-block",
					},
				};
				break;
			case "image":
				newComponent = {
					id: Date.now().toString(),
					type,
					content: "/placeholder.svg?height=200&width=400",
					style: { width: "100%", height: "auto" },
				};
				break;
			case "carousel":
				newComponent = {
					id: Date.now().toString(),
					type,
					content: [
						"/placeholder.svg?height=400&width=600",
						"/placeholder.svg?height=400&width=600",
						"/placeholder.svg?height=400&width=600",
					],
					style: { width: "100%", height: "auto" },
				};
				break;
			case "card":
				newComponent = {
					id: Date.now().toString(),
					type,
					content: {
						title: "Título do Card",
						content: "Conteúdo do card vai aqui.",
						image: "/placeholder.svg?height=200&width=300",
					},
					style: {
						width: "300px",
						border: "1px solid #ddd",
						borderRadius: "8px",
						overflow: "hidden",
					},
				};
				break;
			case "form":
				newComponent = {
					id: Date.now().toString(),
					type,
					content: {
						fields: [
							{ type: "text", label: "Nome", placeholder: "Seu nome" },
							{ type: "email", label: "Email", placeholder: "seu@email.com" },
							{
								type: "textarea",
								label: "Mensagem",
								placeholder: "Sua mensagem",
							},
						],
						submitButton: "Enviar",
					},
					style: { width: "100%", height: "auto" },
				};
				break;
			case "list":
				newComponent = {
					id: Date.now().toString(),
					type,
					content: ["Item 1", "Item 2", "Item 3"],
					style: { width: "100%", height: "auto" },
				};
				break;
			default:
				throw new Error(`Tipo de componente desconhecido: ${type}`);
		}

		setSections(
			sections.map((section) =>
				section.id === sectionId
					? { ...section, components: [...section.components, newComponent] }
					: section,
			),
		);

		setSelectedComponent(newComponent);
	};

	const updateComponent = (
		sectionId: string,
		componentId: string,
		updates: Partial<Pick<Component, "content" | "style">>,
	) => {
		setSections((prevSections) =>
			prevSections.map((section) => {
				if (section.id === sectionId) {
					return {
						...section,
						components: section.components.map((component) => {
							if (component.id === componentId) {
								switch (component.type) {
									case "text":
									case "button":
									case "a":
									case "link":
									case "div":
										// Garante que `content` seja uma string para componentes de texto
										if (typeof updates.content === "string") {
											return { ...component, ...updates } as TextComponent;
										}
										break;
									case "image":
										// Garante que `content` seja uma string para imagem
										if (typeof updates.content === "string") {
											return { ...component, ...updates } as ImageComponent;
										}
										break;
									case "carousel":
										// Garante que `content` seja um array de strings para carrossel
										if (Array.isArray(updates.content)) {
											return { ...component, ...updates } as CarouselComponent;
										}
										break;
									case "card":
										// Garante que `content` seja um objeto com os campos de título, conteúdo e imagem para o cartão
										if (
											typeof updates.content === "object" &&
											updates.content !== null &&
											"title" in updates.content &&
											"content" in updates.content &&
											"image" in updates.content
										) {
											return { ...component, ...updates } as CardComponent;
										}
										break;
									case "form":
										// Garante que `content` seja um objeto específico para o formulário
										if (
											typeof updates.content === "object" &&
											updates.content !== null &&
											"fields" in updates.content &&
											"submitButton" in updates.content
										) {
											return { ...component, ...updates } as FormComponent;
										}
										break;
									case "list":
										// Garante que `content` seja um array de strings para a lista
										if (Array.isArray(updates.content)) {
											return { ...component, ...updates } as ListComponent;
										}
										break;
								}
							}
							return component;
						}),
					};
				}
				return section;
			}),
		);
	};

	const onDragEnd = useCallback(
		(result: DropResult) => {
			if (!result.destination) return;

			const sourceIndex = result.source.index;
			const destIndex = result.destination.index;

			if (result.type === "section") {
				const newSections = Array.from(sections);
				const [reorderedSection] = newSections.splice(sourceIndex, 1);

				if (!reorderedSection) {
					return;
				}
				newSections.splice(destIndex, 0, reorderedSection);
				setSections(newSections);
			} else {
				const sectionId = result.source.droppableId;
				const section = sections.find((s) => s.id === sectionId);
				if (section) {
					const newComponents = Array.from(section.components);
					const [reorderedComponent] = newComponents.splice(sourceIndex, 1);

					if (!reorderedComponent) {
						return;
					}

					newComponents.splice(destIndex, 0, reorderedComponent);
					setSections(
						sections.map((s) =>
							s.id === sectionId ? { ...s, components: newComponents } : s,
						),
					);
				}
			}
		},
		[sections],
	);

	const renderComponent = (component: Component) => {
		switch (component.type) {
			case "text":
				return <p className="text-base text-gray-800">{component.content}</p>;

			case "button":
				return (
					<Button className="px-4 py-2 bg-blue-500 text-white rounded">
						{component.content}
					</Button>
				);

			case "image":
				return (
					<Image
						src={component.content}
						alt="Imagem"
						className="w-full h-auto"
					/>
				);

			case "div":
				return (
					<div className="p-4 bg-gray-100 rounded">{component.content}</div>
				);

			case "a":
			case "link":
				return (
					<Link href="#" className="text-blue-500 underline">
						{component.content}
					</Link>
				);

			case "carousel":
				return (
					<div className="overflow-hidden">
						<div className="flex">
							{component.content.map((image, index) => (
								<Image
									key={index}
									src={image}
									alt={`Slide ${index + 1}`}
									className="w-full h-auto flex-shrink-0"
								/>
							))}
						</div>
					</div>
				);

			case "card":
				return (
					<Card className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
						<Image
							src={component.content.image}
							alt={component.content.title}
							className="w-full h-auto"
						/>
						<div className="p-4">
							<h3 className="text-lg font-semibold mb-2">
								{component.content.title}
							</h3>
							<p>{component.content.content}</p>
						</div>
					</Card>
				);

			case "form":
				return (
					<form className="space-y-4">
						{component.content.fields.map((field, index) => (
							<div key={index}>
								<label className="block mb-1 font-medium text-gray-700">
									{field.label}
								</label>
								{field.type === "textarea" ? (
									<textarea
										placeholder={field.placeholder}
										className="w-full p-2 border border-gray-300 rounded"
									/>
								) : (
									<input
										type={field.type}
										placeholder={field.placeholder}
										className="w-full p-2 border border-gray-300 rounded"
									/>
								)}
							</div>
						))}
						<Button
							type="submit"
							className="px-4 py-2 bg-green-500 text-white rounded"
						>
							{component.content.submitButton}
						</Button>
					</form>
				);

			case "list":
				return (
					<ul className="list-disc list-inside">
						{component.content.map((item, index) => (
							<li key={index} className="text-gray-700">
								{item}
							</li>
						))}
					</ul>
				);

			default:
				return null;
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
				<div
					className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}
				>
					{/* Top Bar */}
					<div className="border-b bg-muted dark:bg-gray-800 p-4 flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<Button
								variant="outline"
								size="icon"
								onClick={() => setDevice("desktop")}
							>
								<Monitor />
							</Button>
							<Button
								variant="outline"
								size="icon"
								onClick={() => setDevice("tablet")}
							>
								<Tablet />
							</Button>
							<Button
								variant="outline"
								size="icon"
								onClick={() => setDevice("mobile")}
							>
								<Smartphone />
							</Button>
							<div className="h-6 w-px bg-border" />
							<Button variant="outline" size="icon">
								<Undo />
							</Button>
							<Button variant="outline" size="icon">
								<Redo />
							</Button>
							<Button
								variant="outline"
								size="icon"
								onClick={toggleDarkMode}
								className="bg-muted dark:bg-gray-800"
							>
								{darkMode ? (
									<Sun className="h-4 w-4" />
								) : (
									<Moon className="h-4 w-4" />
								)}
							</Button>
						</div>
						<div className="flex items-center space-x-4">
							<span className="text-sm text-muted-foreground">
								Rascunho salvo
							</span>
							<Button variant="outline">
								<Eye className="h-4 w-4 mr-2" /> Visualizar site em construção
							</Button>
							<Button>Publicar alterações</Button>
						</div>
					</div>

					<div className="flex h-[calc(100vh-73px)]">
						{/* Left Sidebar */}
						<div
							className={`${showLeftSidebar ? "w-80" : "w-0"} transition-all duration-300 border-r bg-muted dark:bg-gray-800 overflow-hidden`}
						>
							<div className="p-4 space-y-4">
								<div className="space-y-2">
									<h2 className="text-lg font-semibold">Seções</h2>
									<Droppable droppableId="sections" type="section">
										{(
											provided: DroppableProvided,
											snapshot: DroppableStateSnapshot,
										) => (
											<div {...provided.droppableProps} ref={provided.innerRef}>
												{sections.map((section, index) => (
													<Draggable
														key={section.id}
														draggableId={section.id}
														index={index}
													>
														{(
															provided: DroppableProvided,
															snapshot: DroppableStateSnapshot,
														) => (
															<div
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																className={`p-3 rounded-md cursor-pointer flex items-center justify-between mb-2 ${
																	selectedSection === section.id
																		? "bg-accent"
																		: "hover:bg-accent/50"
																}`}
																onClick={() => setSelectedSection(section.id)}
															>
																<div className="flex items-center space-x-2">
																	<Layout className="h-4 w-4" />
																	<span>{section.name}</span>
																</div>
																<div className="flex items-center space-x-1">
																	<Button variant="ghost" size="icon">
																		<Move className="h-4 w-4" />
																	</Button>
																	<Button variant="ghost" size="icon">
																		<Eye className="h-4 w-4" />
																	</Button>
																</div>
															</div>
														)}
													</Draggable>
												))}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
								</div>

								<Button onClick={addSection} className="w-full">
									<Plus className="h-4 w-4 mr-2" /> Adicionar Nova Seção
								</Button>

								{selectedSection ? (
									<div className="space-y-2">
										<h2 className="text-lg font-semibold">
											Adicionar Componente
										</h2>
										<div className="grid grid-cols-2 gap-2">
											<Button
												onClick={() => addComponent(selectedSection, "text")}
												variant="outline"
												size="sm"
											>
												<Type className="h-4 w-4 mr-2" /> Texto
											</Button>
											<Button
												onClick={() => addComponent(selectedSection, "button")}
												variant="outline"
												size="sm"
											>
												<Box className="h-4 w-4 mr-2" /> Botão
											</Button>
											<Button
												onClick={() => addComponent(selectedSection, "image")}
												variant="outline"
												size="sm"
											>
												<ImageIcon className="h-4 w-4 mr-2" /> Imagem
											</Button>
											<Button
												onClick={() => addComponent(selectedSection, "div")}
												variant="outline"
												size="sm"
											>
												<Layout className="h-4 w-4 mr-2" /> Div
											</Button>
											<Button
												onClick={() => addComponent(selectedSection, "a")}
												variant="outline"
												size="sm"
											>
												<LinkIcon className="h-4 w-4 mr-2" /> Link
											</Button>
											<Button
												onClick={() =>
													addComponent(selectedSection, "carousel")
												}
												variant="outline"
												size="sm"
											>
												<ImagePlus className="h-4 w-4 mr-2" /> Carousel
											</Button>
											<Button
												onClick={() => addComponent(selectedSection, "card")}
												variant="outline"
												size="sm"
											>
												<CreditCard className="h-4 w-4 mr-2" /> Card
											</Button>
											<Button
												onClick={() => addComponent(selectedSection, "form")}
												variant="outline"
												size="sm"
											>
												<FileText className="h-4 w-4 mr-2" /> Formulário
											</Button>
											<Button
												onClick={() => addComponent(selectedSection, "list")}
												variant="outline"
												size="sm"
											>
												<List className="h-4 w-4 mr-2" /> Lista
											</Button>
										</div>
									</div>
								) : null}
							</div>
						</div>

						{/* Toggle Left Sidebar */}
						<Button
							variant="ghost"
							size="icon"
							className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
							onClick={() => setShowLeftSidebar(!showLeftSidebar)}
						>
							{showLeftSidebar ? <ChevronLeft /> : <ChevronRight />}
						</Button>

						{/* Main Content */}
						<div
							className={`flex-1 transition-all duration-300 ${!showLeftSidebar && !showRightSidebar ? "mx-8" : ""}`}
						>
							{/* Preview */}
							<div className="h-full p-8 overflow-auto bg-white">
								<div
									className={`mx-auto transition-all ${
										device === "mobile"
											? "w-[320px]"
											: device === "tablet"
												? "w-[768px]"
												: "w-full max-w-6xl"
									}`}
								>
									{sections.map((section) => (
										<Droppable droppableId={section.id} key={section.id}>
											{(
												provided: DroppableProvided,
												snapshot: DroppableStateSnapshot,
											) => (
												<div
													{...provided.droppableProps}
													ref={provided.innerRef}
													className={`relative group mb-4 ${selectedSection === section.id ? "ring-2 ring-blue-500" : ""} ${snapshot.isDraggingOver ? "bg-gray-100" : ""}`}
													style={{
														backgroundColor: section.style.backgroundColor,
														padding: section.style.padding,
													}}
													onClick={() => setSelectedSection(section.id)}
												>
													{section.components.map((component, index) => (
														<Draggable
															key={component.id}
															draggableId={component.id}
															index={index}
														>
															{(
																provided: DroppableProvided,
																snapshot: DroppableStateSnapshot,
															) => (
																<div
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																	className={`mb-2 cursor-move relative ${selectedComponent?.id === component.id ? "ring-2 ring-green-500" : ""} ${snapshot.isDragging ? "opacity-50" : ""}`}
																	onClick={(e) => {
																		e.stopPropagation();
																		setSelectedComponent(component);
																	}}
																>
																	{renderComponent(component)}
																</div>
															)}
														</Draggable>
													))}
													{provided.placeholder}
												</div>
											)}
										</Droppable>
									))}
								</div>
							</div>
						</div>

						{/* Toggle Right Sidebar */}
						<Button
							variant="ghost"
							size="icon"
							className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
							onClick={() => setShowRightSidebar(!showRightSidebar)}
						>
							{showRightSidebar ? <ChevronRight /> : <ChevronLeft />}
						</Button>

						{/* Component Editor */}
						<div
							className={`${showRightSidebar ? "w-80" : "w-0"} transition-all duration-300 border-l bg-muted dark:bg-gray-800 overflow-hidden`}
						>
							<ComponentEditor
								selectedComponent={selectedComponent}
								onUpdateComponent={(updates) => {
									if (selectedComponent && selectedSection) {
										updateComponent(
											selectedSection,
											selectedComponent.id,
											updates,
										);
									}
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</DragDropContext>
	);
}
