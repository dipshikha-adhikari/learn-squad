import { Request, Response } from "express";
import { Model } from "mongoose";
const Reservation: Model<any> = require("../../models/Reservation");

export const getAllReservations = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    if (userId !== undefined) {

      const data = await Reservation.find({
        userId,
      })
        .populate("listingId")
        .exec();

      const modifiedData = data.map((item) => ({
        ...item.toJSON(),
        listing: item.listingId,
        listingId: undefined,
      }));

      return res.status(200).send(modifiedData);
    }

    const data = await Reservation.find();
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send({ message: "Failed to get reservation " });
  }
};
