import { IListing } from "../../types";
import { privateRequest } from "../requestMethod";

export async function makeFavorite(listing: IListing) {
  try {
    await privateRequest.post("/api/v1/favorites", listing);
  } catch (err) {
    console.log(err);
  }
}

export async function removeFavorite(listing: IListing) {
  try {
    await privateRequest.delete(`/api/v1/favorites/${listing._id}`);
  } catch (err) {
    console.log(err);
  }
}
