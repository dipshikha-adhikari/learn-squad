import { Request, Response } from "express";
import { Model } from "mongoose";
import { IUser } from "../../models/User";
const User: Model<any> = require("../../models/User");

interface RequestProps extends Request {
  user: IUser;
}

export const getFavorites = async (req: RequestProps, res: Response) => {
  try {
    const { id: userId } = req.user;
    const user = await User.findById(userId, 'favorites').populate('favorites');
    return res.status(200).json(user.favorites);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Failed to get favorites" });
  }
};
