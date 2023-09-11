import { Request, Response } from "express";
import { Model } from "mongoose";

interface RequestProps extends Request {
  user: string;
}

const User: Model<any> = require("../../models/User");
export const getCurrentUser = async (req: RequestProps, res: Response) => {
  if (req.user !== undefined) {
    const { id: userId }: any = req.user;
    try {
   
    const user = await User.findById(userId)
      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(403).send({ message: 'Failed to get user' });
      return;
    }
  }
};
