import { Request, Response } from "express";
import { Model } from "mongoose";

const User: Model<any> = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const handleLogin = async (req: Request, res: Response) => {
  if (req.body !== undefined) {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(400).json({ msg: "User not found" });
        return;
      }
      const hash = user.password;
      const isPasswordCorrect = await bcrypt.compare(password, hash);

      if (isPasswordCorrect) {
        const token = jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        let newUser = { user, auth: true, token };
        res.status(200).json({ ...newUser });
      } else {
        res.status(400).json({ msg: "Incorrect password" });
        return;
      }
    } catch (err) {
      res.status(400).json({ msg: "Internal server error" });
      return;
    }
  }
};
