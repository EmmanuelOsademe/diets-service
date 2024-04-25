import { number, object, string } from "zod";

export const createAppointmentSchema = object({
  body: object({
    type: string({ required_error: "Type is required" }),
    frequency: string({ required_error: "Frequency is required" }),
    amount: number({ required_error: "Amount is required" }),
  }),
});
