'use client'

import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { PropsSideBarBuilder } from "./SideBarTypes";
import { Package2, PanelLeft, Settings } from "lucide-react";

export const SideBarStaticFormer = ({
  NomeEmpresa,
  buttonsData,
  buttonConfig = [],
}: PropsSideBarBuilder) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">{NomeEmpresa}</span>
          </Link>
          <TooltipProvider>
            {buttonsData.map((button, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={button.link || "#"}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${button.disable ? "text-muted-foreground" : "hover:text-foreground"} transition-colors`}
                  >
                    {button.icon}
                    <span className="sr-only">{button.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{button.label}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <TooltipProvider>
            {buttonConfig.map((button, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={button.link || "#"}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${button.disable ? "text-muted-foreground" : "hover:text-foreground"} transition-colors`}
                  >
                    {button.icon}
                    <span className="sr-only">{button.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{button.label}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                {buttonsData.map((button, index) => (
                  <Link
                    key={index}
                    href={button.link || "#"}
                    className={`flex items-center gap-4 px-2.5 ${button.disable ? "text-muted-foreground" : "hover:text-foreground"}`}
                  >
                    {button.icon}
                    {button.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
}
