import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

const Initial = z.string().min(2).max(2).toUpperCase();

export const genEntityId = (initials: string) =>
	`${Initial.parse(initials)}_${createId().toUpperCase()}`;
