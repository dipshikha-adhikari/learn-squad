import { Request, Response } from "express";
import { Model } from "mongoose";
import { IUser } from "../../models/User";

const Listing: Model<any> = require("../../models/Listing");
const User: Model<any> = require("../../models/User");

interface RequestProps extends Request {
  user: IUser;
}

export const deleteListingById = async (req: RequestProps, res: Response) => {
  if (req.params !== undefined && req.user) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;

      await Listing.findByIdAndDelete(id);

      await User.findByIdAndUpdate(userId, {
        $pull: { listings: id },
      });
      return res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ message: "Failed to delete" });
    }
  } else {
    return res.status(404).json({ message: "Invalid listingId or userId " });
  }
};
