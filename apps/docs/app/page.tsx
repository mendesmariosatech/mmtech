import Image from "next/image";
import { Button } from "@repo/ui/button";
import { SheetDemo } from "@repo/ui/SheetDemo"
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={"bg-red-400"}>
      <SheetDemo />
    </div>
  );
}
