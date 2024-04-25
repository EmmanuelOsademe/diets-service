import { Schema, model, Document } from "mongoose";

export interface IAppointment extends Document {
  type: string;
  frequency: string;
  amount: number;
  userId: Schema.Types.ObjectId;
  clientSecret: string;
  status: string;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    type: { type: String, required: true },
    frequency: { type: String, required: true },
    amount: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    clientSecret: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

const Appointment = model<IAppointment>("Appointment", AppointmentSchema);
export default Appointment;
