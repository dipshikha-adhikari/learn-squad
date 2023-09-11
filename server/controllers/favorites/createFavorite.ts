import { Request, Response } from "express";
import { Model } from "mongoose";
import { IUser } from "../../models/User";
const User: Model<any> = require("../../models/User");

interface RequestProps extends Request {
  user: IUser;
}

export const createFavorite = async (req: RequestProps, res: Response) => {
  try {
    const { id: userId } = req.user;
    const { _id: listingId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isItemInFavorites = user.favorites.some(
      (item: any) => item._id === listingId
    );
    if (isItemInFavorites) {
      return res
        .status(200)
        .json({ message: "Item already in favorites", listingId });
    }

    // Add the item to favorites array and save the user
    const data = await User.updateOne(
      {
        _id: userId,
      },
      {
        $addToSet: { favorites: listingId },
      }
    );
    return res.status(200).json({ message: "Item added to favorites", data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Failed to add item" });
  }
};
