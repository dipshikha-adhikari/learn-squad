import { Request, Response } from "express";
import { Model } from "mongoose";

interface RequestProps extends Request {
  user: string;
}

const User: Model<any> = require("../../models/User");

export const getAllUsers = async (req: RequestProps, res: Response) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(403).send({ message: "failed to get user" });
    return;
  }
};
