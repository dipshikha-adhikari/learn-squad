import { Request, Response } from "express";
import { Model } from "mongoose";
const Listing: Model<any> = require("../../models/Listing");

export const getListingById = async (req: Request, res: Response) => {
  if (req.params !== undefined) {
    const { id } = req.params;

    try {
      const listings = await Listing.findById(id).populate('reservations').exec()
      if(listings){
        return res.status(200).send(listings);
      }else{
        return res.status(400).send('can not find listing');
      }
     
    } catch (err) {
      return res
        .status(500)
        .send({ message: "failed to get listing", error: err });
    }
  } else {
    return res.status(400).json({ error: "Invalid request body" });
  }
};
