import { Request, Response } from "express";
import { Model } from "mongoose";
import { IUser } from "../../models/User";
import { IListing } from "../../models/Listing";

const User: Model<any> = require("../../models/User");
const Listing: Model<any> = require("../../models/Listing");
interface RequestProps extends Request {
  user: IUser;
}

export const createListing = async (req: RequestProps, res: Response) => {
  if (req.body !== undefined && req.user) {
    const { id: userId } = req.user;
    const {
      title,
      description,
      location,
      images,
      category,
      rooms,
      bathrooms,
      guests,
      price,
    }: IListing = req.body;
    try {
      const newListing = await Listing.create({
        userId,
        title,
        description,
        location,
        images,
        category,
        rooms,
        bathrooms,
        guests,
        price,
      });
      await User.findByIdAndUpdate(userId, {
        $push: { listings: newListing },
      });

      return res.status(201).json({ success: true, listing: newListing });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create listing" });
    }
  } else {
    return res.status(400).json({ error: "Invalid request body" });
  }
};
