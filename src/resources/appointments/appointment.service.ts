import Stripe from "stripe";
import User from "../user/user.model";
import { CreateAppointmentInterface } from "./appointment.interface";
import Appointment, { IAppointment } from "./appointment.model";
import { log } from "@/utils/index";

class AppointmentService {
  private appointmentModel = Appointment;
  private userModel = User;

  public async createAppointment(
    input: CreateAppointmentInterface,
    userId: string
  ): Promise<object> {
    const { type, frequency, amount } = input;

    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);

    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const validatedAmount = amount > 4000000 ? Math.floor(amount) : 4000000;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: validatedAmount,
        currency: "NGN",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      const appointment = await this.appointmentModel.create({
        amount: paymentIntent.amount,
        type: type,
        frequency,
        clientSecret: paymentIntent.client_secret,
        status: paymentIntent.status,
      });

      if (!appointment) {
        throw new Error("Error creating appointment");
      }
      return { appointment, paymentIntent };
    } catch (e: any) {
      log.error(e.message);
      throw new Error(e.message || "Error creating appointment");
    }
  }
}

export default AppointmentService;
