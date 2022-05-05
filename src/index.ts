import Chat from "./pages/chat";
import Profile from "./pages/profile";
import * as components from "./components/*/index.ts";
import * as dropDown from "./components/drop-down/*/index.ts";
import * as chatComponents from "./pages/chat/*/index.ts";
import registerGroupComponent from "./core/register-group-component";
import Login from "./pages/login";
import Registration from "./pages/registration";
import NotFound from "./pages/404";
import InternalServerError from "./pages/500";
import { router } from "./core/router";
import * as profileComponents from './pages/profile/*/index.ts

registerGroupComponent(chatComponents);
registerGroupComponent(profileComponents);
registerGroupComponent(components);
registerGroupComponent(dropDown);

document.addEventListener("DOMContentLoaded", () => {
  router
    .use("/", Login)
    .use("/sign-up", Registration)
    .use("/messenger", Chat)
    .use("/profile", Profile)
    .use("/404", NotFound)
    .use("/500", InternalServerError)
    .start();

});
