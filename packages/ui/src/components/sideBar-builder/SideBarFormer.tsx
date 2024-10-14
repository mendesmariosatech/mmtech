"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import React from "react";
import Link from "next/link";
import { PropsSideBarBuilder } from "./SideBarTypes";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { PanelLeft } from "lucide-react";

export const SideBarFormer = ({
	buttonsData,
	NomeEmpresa,
	buttonConfig = []
}: PropsSideBarBuilder) => {
	const [open, setOpen] = useState(true);
	const pathName = usePathname() || "";

	return (
		<section className="flex w-full relative bg-gray-200">
			{/* <aside
				className={`hidden sm:flex flex-col bg-[#25508C] rounded-tr-xl rounded-br-xl text-white h-[800px] shadow-lg shadow-gray-900/20 duration-200 ease-out ${open ? "w-[18.5rem]" : "w-[5rem]"}`}
			>
				<div className="flex relative items-center mx-3.5 py-4 px-3.5">
					<Image
						src="/marketing/landingPage/logo.svg"
						alt="Logo"
						width={45}
						height={45}
					/>
					<h3 className={`${open ? `pl-2 font-bold text-lg` : `scale-0`}`}>
						{NomeEmpresa}
					</h3>
					<div
						onClick={() => setOpen(!open)}
						className={`absolute bg-gray-200 rounded-full text-3xl -right-6 top-6 border-2 border-[#25508C]`}
					>
						<ChevronLeftIcon
							className={`h-7 w-7 text-[#25508C] ${!open && `duration-200 transition rotate-180`}`}
						/>
					</div>
				</div>
				<hr className="bg-gray-50 mx-3.5" />
				<div className="flex flex-col gap-2 items-start my-4 mx-4">
					{buttonsData.map((button, index) => {
						if (button.dropdownItems && button.dropdownItems.length > 0) {
							// Dropdown Menu Logic
							const isOpen =
								button.dropdownItems?.some((item) =>
									pathName.includes(item.link || ""),
								) || false;
							return (
								<DropdownMenu key={index}>
									<DropdownMenuTrigger asChild>
										<Button
											variant="ghost"
											className={`flex ${open ? `gap-2 items-start justify-start` : `items-center justify-center p-0 gap-0`} text-md font-light text-white w-full cursor-pointer ${isOpen ? "border border-white bg-white text-black" : ""}`}
										>
											{button.icon}
											{open && button.label}
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										className={`${open ? "w-[16rem] min-w-8" : "w-[3rem] min-w-8"}`}
									>
										{button.dropdownItems.map((item, subIndex) => (
											<DropdownMenuItem
												key={subIndex}
												disabled={item.disabled}
												onClick={() => {
													if (item.onClick) {
														item.onClick();
													}
												}}
											>
												<Link
													href={item.link || ""}
													className={`flex ${open ? "gap-5" : "gap-0"}`}
												>
													{item.icon}
													{open && item.label}
												</Link>
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							);
						} else {
							// Regular Button Logic
							return (
								<Button
									key={index}
									variant="ghost"
									className={`flex ${open ? `gap-2 items-start justify-start` : `items-center justify-center p-0 gap-0`} text-md font-light text-white w-full cursor-pointer ${button.link === pathName ? "border border-white bg-white text-black" : ""}`}
									disabled={button.disable}
								>
									<Link
										href={button.link || ""}
										className={`flex ${open ? "gap-5" : "gap-0"}`}
									>
										{button.icon}
										{open && button.label}
									</Link>
								</Button>
							);
						}
					})}
				</div>
				<hr className="bg-gray-50 mx-3.5 opacity-50" />
				<div className="flex flex-col gap-2 items-start my-4 mx-4">
					{buttonConfig.map((button, index) => {
						if (button.dropdownItems && button.dropdownItems.length > 0) {
							// Dropdown Menu Logic
							const isOpen =
								button.dropdownItems?.some((item) =>
									pathName.includes(item.link || ""),
								) || false;
							return (
								<DropdownMenu key={index}>
									<DropdownMenuTrigger asChild>
										<Button
											variant="ghost"
											className={`flex ${open ? `gap-2 items-start justify-start` : `items-center justify-center p-0 gap-0`} text-md font-light text-white w-full cursor-pointer ${isOpen ? "border border-white bg-white text-black" : ""}`}
										>
											{button.icon}
											{open && button.label}
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										className={`${open ? "w-[16rem] min-w-8" : "w-[3rem] min-w-8"}`}
									>
										{button.dropdownItems.map((item, subIndex) => (
											<DropdownMenuItem
												key={subIndex}
												disabled={item.disabled}
												onClick={() => {
													if (item.onClick) {
														item.onClick();
													}
												}}
											>
												<Link
													href={item.link || ""}
													className={`flex ${open ? "gap-5" : "gap-0"}`}
												>
													{item.icon}
													{open && item.label}
												</Link>
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							);
						} else {
							// Regular Button Logic
							return (
								<Button
									key={index}
									variant="ghost"
									className={`flex ${open ? `gap-2 items-start justify-start` : `items-center justify-center p-0 gap-0`} text-md font-light text-white w-full cursor-pointer ${button.link === pathName ? "border border-white bg-white text-black" : ""}`}
									disabled={button.disable}
								>
									<Link
										href={button.link || ""}
										className={`flex ${open ? "gap-5" : "gap-0"}`}
									>
										{button.icon}
										{open && button.label}
									</Link>
								</Button>
							);
						}
					})}
				</div>
			</aside> */}
			<div className="sm:hidden bg-[#2563EB] top-0 w-full fixed h-[36px] z-10">
				<div className="flex flex-row justify-between items-center">
					<h3 className={`pl-2 font-bold text-lg text-white`}>
						{NomeEmpresa}
					</h3>
					<Sheet>
						<SheetTrigger asChild className="p-0 m-0 border-none">
							<Button variant={"ghost"}>
								<PanelLeft className="text-white w-6 h-6 " />
							</Button>
						</SheetTrigger>
						<SheetContent>
							<div className="h-screen overflow-y-auto">
								<SheetHeader>
									<div className="flex relative items-center mx-3.5 py-4 px-3.5">
										<Image src='' alt="Logo" width={45} height={45}></Image>
										<h3 className={`pl-2 font-bold text-lg`}>{NomeEmpresa}</h3>
									</div>
								</SheetHeader>
								<hr className="bg-[#25508C] mx-3.5 border-[#25508C]" />
								<div className="flex flex-col gap-2 items-start my-4 mx-4">
									{buttonsData.map((button, index) => (
										<SheetClose asChild>
											<Button
												key={index}
												variant="ghost"
												className={`flex ${open ? `gap-2 items-start justify-start` : `items-center justify-center p-0 gap-0`} text-md font-light text-[#25508C] w-full cursor-pointer ${button.link === pathName ? "border border-white bg-white text-black" : ""}`}
												disabled={button.disable}
											>
												<Link
													href={button.link || ""}
													className={`flex ${open ? "gap-5" : "gap-0"}`}
												>
													{button.icon}
													{button.label}
												</Link>
											</Button>
										</SheetClose>
									))}
								</div>
								<hr className="bg-[#25508C] mx-3.5 border-[#25508C] opacity-50" />
								<div className="flex flex-col gap-2 items-start mt-2 mb-20 mx-4">
									<SheetClose asChild>
										{buttonConfig.map((button, index) => {
											if (button.dropdownItems && button.dropdownItems.length > 0) {
												// Dropdown Menu Logic
												const isOpen =
													button.dropdownItems?.some((item) =>
														pathName.includes(item.link || ""),
													) || false;
												return (
													<DropdownMenu key={index}>
														<DropdownMenuTrigger asChild>
															<Button
																variant="ghost"
																className={`flex ${open ? `gap-2 items-start justify-start` : `items-center justify-center p-0 gap-0`} text-md font-light text-[#25508C] w-full cursor-pointer ${isOpen ? "border border-white bg-white text-black" : ""}`}
															>
																{button.icon}
																{open && button.label}
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent
															className={`${open ? "w-[16rem] min-w-8" : "w-[3rem] min-w-8"}`}
														>
															{button.dropdownItems.map((item, subIndex) => (
																<DropdownMenuItem
																	key={subIndex}
																	disabled={item.disabled}
																	onClick={() => {
																		if (item.onClick) {
																			item.onClick();
																		}
																	}}
																>
																	<Link
																		href={item.link || ""}
																		className={`flex ${open ? "gap-5" : "gap-0"}`}
																	>
																		{item.icon}
																		{open && item.label}
																	</Link>
																</DropdownMenuItem>
															))}
														</DropdownMenuContent>
													</DropdownMenu>
												);
											} else {
												// Regular Button Logic
												return (
													<Button
														key={index}
														variant="ghost"
														className={`flex ${open ? `gap-2 items-start justify-start` : `items-center justify-center p-0 gap-0`} text-md font-light text-white w-full cursor-pointer ${button.link === pathName ? "border border-white bg-white text-black" : ""}`}
														disabled={button.disable}
													>
														<Link
															href={button.link || ""}
															className={`flex ${open ? "gap-5" : "gap-0"}`}
														>
															{button.icon}
															{open && button.label}
														</Link>
													</Button>
												);
											}
										})}
									</SheetClose>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</section>
	);
};
