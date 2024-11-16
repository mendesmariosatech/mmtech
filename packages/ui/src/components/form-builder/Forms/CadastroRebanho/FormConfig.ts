import { z } from "zod";
import type { ConfigObject } from "../../ControlledInput";

export const cadatroRebanhoFields = z.object({
	nickname: z.string().min(3, { message: "Apelido" }),
	type: z.string().min(3, { message: "Tipo Requerido" }),
	breed: z.string().min(3, { message: "Raca Requerido" }),
	bornDate: z.string().min(3, { message: "Data de nascimento Requerido" }), // should be date
	identification: z.string().optional(),
});

export type CadastroRebanhoFields = z.infer<typeof cadatroRebanhoFields>;

export const rebanhoFormConfig: ConfigObject<CadastroRebanhoFields> = {
	nickname: {
		name: "nickname",
		input: "text",
		label: "Apelido",
		placeholder: "Apelido do animal",
	},
	type: {
		name: "type",
		input: "text",
		label: "Tipo",
		placeholder: "Tipo",
	},
	breed: {
		name: "breed",
		input: "text",
		label: "Raça",
		placeholder: "Malhada",
	},
	bornDate: {
		name: "bornDate",
		input: "date",
		label: "Data de nascimento",
		placeholder: "12/12/2015",
	},
	identification: {
		name: "identification",
		input: "text",
		label: "Identificação",
		description: "Codigo do animal",
		placeholder: "Ex: #1290, ANA_345, etc",
	},
};
