import "dotenv/config";
import "module-alias/register";
import App from "./app";
import { validateEnv } from "@/utils/index";
import UserController from "@/resources/user/user.controller";
import SessionController from "@/resources/session/session.controller";
import BlogController from "@/resources/blog/blog.controller";
import MessageController from "@/resources/message/message.controller";
import AppointmentController from "./resources/appointments/appointment.controller";

validateEnv();

const app = new App(
  [
    new UserController(),
    new SessionController(),
    new BlogController(),
    new MessageController(),
    new AppointmentController(),
  ],
  Number(process.env.PORT || 5003)
);
app.listen();
