import { registerHandler, registerSpec } from "./register";

export const authRoutes = [[registerSpec, registerHandler]] as const;
