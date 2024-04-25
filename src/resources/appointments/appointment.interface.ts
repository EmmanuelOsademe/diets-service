import { TypeOf } from "zod";
import { createAppointmentSchema } from "./appointment.validation";

export type CreateAppointmentInterface = TypeOf<
  typeof createAppointmentSchema
>["body"];
