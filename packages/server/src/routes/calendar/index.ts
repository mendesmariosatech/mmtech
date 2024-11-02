import { app } from "../../base/base-app";
import { createEventHandler, createEventSpec } from "./create-event";
// import { loginHandler, loginSpec } from "./login";
// import { logoutHandler, logoutSpec } from "./logout";
// import { registerHandler, registerSpec } from "./register";

export const calendarRouter = app.openapi(createEventSpec, createEventHandler);
// .openapi(registerSpec, registerHandler)
// .openapi(logoutSpec, logoutHandler);
