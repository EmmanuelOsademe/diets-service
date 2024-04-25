import { Controller } from "@/utils/interfaces";
import { Router, Request, Response, NextFunction } from "express";
import AppointmentService from "./appointment.service";
import loggedIn from "@/middlewares/logged.in.middleware";
import validateResource from "@/middlewares/validation.middleware";
import { createAppointmentSchema } from "./appointment.validation";
import { CreateAppointmentInterface } from "./appointment.interface";
import { HttpException } from "@/utils/exceptions";
import { StatusCodes } from "http-status-codes";
import { log } from "@/utils/index";
import { result } from "lodash";

class AppointmentController implements Controller {
  public path = "/appointments";
  public router = Router();
  private appointmentService = new AppointmentService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes = () => {
    this.router.post(`${this.path}/create`, [
      loggedIn,
      validateResource(createAppointmentSchema),
      this.createAppointment,
    ]);
  };

  private createAppointment = async (
    req: Request<{}, {}, CreateAppointmentInterface>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const input = req.body;
    const { _id: userId } = res.locals.user;

    try {
      const result = await this.appointmentService.createAppointment(
        input,
        userId
      );
      res.status(StatusCodes.CREATED).json(result);
    } catch (e: any) {
      log.error(e.message);
      next(new HttpException(StatusCodes.BAD_REQUEST, e.message));
    }
  };
}

export default AppointmentController;
