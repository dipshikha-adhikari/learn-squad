import { Request, Response } from "express";
import { Model } from "mongoose";
import { IUser } from "../../models/User";
import { IListing } from "../../models/Listing";

const Listing: Model<any> = require("../../models/Listing");
interface RequestProps extends Request {
    user: IUser;
}

export const updateListing = async (req: RequestProps, res: Response) => {
    if (req.body !== undefined && req.user) {

        try {
            const { id: userId } = req.user;
            const {
                title,
                description,
                location,
                images,
                category,
                rooms,
                bathrooms,
                guests,
                price,
            }: IListing = req.body;
            const { id } = req.params
            const newListing = await Listing.findByIdAndUpdate(id, {
                userId,
                title,
                description,
                location,
                images,
                category,
                rooms,
                bathrooms,
                guests,
                price,
            },{new:true})

            return res.status(201).json({ success: true, listing: newListing });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to create listing" });
        }
    } else {
        return res.status(400).json({ error: "Invalid request body" });
    }
};
