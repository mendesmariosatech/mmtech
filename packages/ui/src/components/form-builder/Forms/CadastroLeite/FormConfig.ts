import { z } from "zod";
import type { ConfigObject } from "../../ControlledInput";

export const cadatroLeiteFields = z.object({
	valor: z.string().min(3, { message: "Valo Requerido" }), // should be date,
	month: z.string().min(3, { message: "Data" }), // should be date
});

export type CadastroLeiteFields = z.infer<typeof cadatroLeiteFields>;

export const leiteFormConfig: ConfigObject<CadastroLeiteFields> = {
	valor: {
		name: "valor",
		input: "text",
		label: "Valor",
		placeholder: "Valor",
	},
	month: {
		name: "month",
		input: "month",
		label: "Mes",
		placeholder: "12/2024",
	},
};
