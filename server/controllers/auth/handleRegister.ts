import { Request, Response } from "express";
import { Model, Models } from "mongoose";
const User: Model<any> = require("../../models/User");
const bcrypt = require('bcrypt')

export const handleRegister = async (req: Request, res: Response) => {
  if (req.body !== undefined) {
    const { email, password , name} = req.body;
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      res.status(400).json({ msg: "Email already exists" });
      return;
    }
  if(password.length < 6){
    res.status(400).json({ msg: "Password must be of min 6 length" });
    return;
  }

    try {
        const hashedPassword = await bcrypt.hash(password, 12)
      const newUser = await User.create({ ...req.body, password:hashedPassword });
      res.status(200).json({ user: newUser });
    } catch (err) {
      console.log(err);
      res.status(403).json({ msg: "Error creating user", error: err });
      return;
    }
  }
};

