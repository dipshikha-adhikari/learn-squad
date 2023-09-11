import { NextFunction, Request, Response } from "express";
import { IUser } from "../../client/types";
const jwt = require("jsonwebtoken");

interface UserRequest extends Request {
  user: IUser;
}

const verifyToken = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.token;
  if (token !== undefined) {
    jwt.verify(token, process.env.JWT_SECRET, (err: any, user: IUser) => {
      if (err)  return res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

module.exports = verifyToken;
