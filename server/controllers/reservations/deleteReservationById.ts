import { Request, Response } from "express";
import { Model } from "mongoose";
import { IUser } from "../../models/User";
const User: Model<any> = require("../../models/User");
const Reservation: Model<any> = require("../../models/Reservation");
const Listing: Model<any> = require("../../models/Listing");

interface RequestProps extends Request {
  user: IUser | null;
}

export const deleteReservationById = async (req: RequestProps, res: Response) => {
  if (req.params !== undefined && req.user !== null) {
    const { id } = req.params;
    const { id: userId } = req.user;
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) return res.status(400).send({ message: "User not found" });
      await Reservation.findByIdAndDelete(
     id
      );

      await User.updateOne(
        {
          _id: userId,
        },
        {
          $pull: { reservations: id },
        }
      );

      await Listing.updateOne(
        {
          $pull: { reservations: id },
        }
      );

      return res.status(200).send({ message: "Successfully deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Failed to delete" });
    }
  } else {
    return res.status(400).send({ message: "Please provide listing id" });
  }
};
