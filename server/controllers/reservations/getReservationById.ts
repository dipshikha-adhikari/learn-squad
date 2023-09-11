import { Request, Response } from "express";
import { Model } from "mongoose";
import { IUser } from "../../models/User";

const Reservation: Model<any> = require("../../models/Reservation");

interface RequestProps extends Request {
  user: IUser;
}

export const getReservationById = async (req: RequestProps, res: Response) => {
  if (req.params !== undefined) {
    const { id } = req.params;

    try {
      const data = await Reservation.findById(id).populate("listing").exec();
      return res.status(200).send(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      return res.status(400).send(error);
    }
  } else {
    return res.status(400).send({ message: "Please provide a valid userId" });
  }
};
