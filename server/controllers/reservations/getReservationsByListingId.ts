import { Request, Response } from "express";
import { Model } from "mongoose";
import { IUser } from "../../models/User";

const Reservation: Model<any> = require("../../models/Reservation");

interface RequestProps extends Request {
  user: IUser;
}

export const getReservationsByListingId = async (
  req: RequestProps,
  res: Response
) => {
  if (req.params !== undefined) {
    const { id } = req.params;

    try {

      const data = await Reservation.findOne({ listingId: id })
        .populate("listing")
        .exec();

      if (data) {
        const finalData = {
          ...data.toJSON(),
          listing: data.listingId,
          listingId: undefined,
        };
        return res.status(200).send(finalData);
      }
      return res.status(400).send({ message: "No reservation found" });
    } catch (error) {
      console.error("Error fetching reservations:", error);
      return res.status(400).send(error);
    }
  } else {
    return res.status(400).send({ message: "Please provide a valid id" });
  }
};
