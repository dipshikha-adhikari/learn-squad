import { Request, Response } from "express";
import { Model } from "mongoose";
const Listing: Model<any> = require("../../models/Listing");

export const getAllListings = async (req: Request, res: Response) => {
  try {
    if (Object.keys(req.query).length === 0) {
      const listings = await Listing.find();
      return res.status(200).send(listings);
    } else {
      const { category, location,
        rooms,
        bathrooms,
        guests, } = req.query;

      const query: any = {}

      if (category) {
        query.category = category
      }

      if (location) {
        query.location = { $regex: location, $options: "i" };
      }
      if (guests) {
        query.guests = { $gte: parseInt(guests as string) }
      }
      if (rooms) {
        query.rooms = { $gte: parseInt(rooms as string) }
      }
      if (bathrooms) {
        query.bathrooms = { $gte: parseInt(bathrooms as string) }
      }
      const listings = await Listing.find(query);
      return res.status(200).send(listings);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "failed to get listings" });
  }
};
