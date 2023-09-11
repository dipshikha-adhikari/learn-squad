import { Request, Response } from "express";
import mongoose, { Model } from "mongoose";

interface RequestProps extends Request {
  user: string;
}

const User: Model<any> = require("../../models/User");

export const getUserById = async (req: RequestProps, res: Response) => {
  if (!req.params || !req.params.id) {
    return res.status(400).send({ message: "Please provide a valid user ID" });
  }

  try {
    let { id } = req.params;
    let objId = new mongoose.Types.ObjectId(id);
    const user = await User.aggregate([
      {
        $match: {
          _id: objId,
        },
      },
      {
        $lookup: {
          from: "reservations",
          localField: "reservations",
          foreignField: "_id",
          as: "reservationsData",
        },
      },
      {
        $addFields: {
          favorites: {
            $map: {
              input: "$favorites",
              as: "favorite",
              in: "$$favorite._id",
            },
          },
        },
      },
      {
        $project: {
          reservations: 0,
        },
      },
    ]);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(403).send({ message: "failed to get user" });
    return;
  }
};
