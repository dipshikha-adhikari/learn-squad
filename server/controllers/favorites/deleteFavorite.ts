import { Request, Response } from "express";
import { Model } from "mongoose";
import { IUser } from "../../models/User";
const User: Model<any> = require("../../models/User");

interface RequestProps extends Request {
  user: IUser;
}

export const deleteFavorite = async (req: RequestProps, res: Response) => {
  if (req.user !== undefined && req.params !== undefined) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;

      await User.updateOne({ _id: userId }, { $pull: { favorites: id } });

      return res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Failed to delete" });
    }
  } else {
    res.status(500).send({ message: "Invalid userId or listingId" });
  }
};
