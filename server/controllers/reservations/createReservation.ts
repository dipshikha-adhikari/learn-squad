import { Request, Response } from "express";
import { Model } from "mongoose";
import { IUser } from "../../models/User";
import { IReservation } from "../../models/Reservation";

const User: Model<any> = require("../../models/User");
const Reservation = require("../../models/Reservation");
const Listing: Model<any> = require("../../models/Listing");

interface RequestProps extends Request {
  user: IUser;
}
export const createReservation = async (req: RequestProps, res: Response) => {

  if (req.body !== undefined && req.user !== undefined) {
    const { id: userId } = req.user;
    const { startDate, endDate, listing, guests, totalPrice }: IReservation =
      req.body;
console.log(listing)
    try {
      const user: IUser | null = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const existedReservation = await Reservation.findOne({
        userId,
        listing,
      });
      if (existedReservation) {
        return res
          .status(400)
          .send({ message: "Already reserved for this user" });
      }

      const result = await Reservation.create({
        startDate,
        endDate,
        listing,
        guests,
        totalPrice,
        userId,
      });

      await User.findByIdAndUpdate(userId, {
        $push: { reservations: result },
      });

      await Listing.findByIdAndUpdate(listing, {
        $push: { reservations: result._id },
      });

      res.status(200).send({ message: "Reservation created successfully" });
    } catch (err) {
      console.error(err);

      res.status(500).send({ message: "Failed to create reservation" });
    }
  } else {
    console.log("error");
    res.status(400).send({ message: "Invalid request body or user" });
  }
};
