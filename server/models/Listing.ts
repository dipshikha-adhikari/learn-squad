import mongoose, { Schema, model, Document, Types } from 'mongoose';

export interface IListing extends Document {
  title: string;
  description: string;
  images: [];
  createdAt: Date;
  category: string;
  rooms: number;
  bathrooms: number;
  guests: number;
  location: string;
  userId: Types.ObjectId;
  price: number;
  reservations: Types.ObjectId[];
}

const listingSchema: Schema<IListing> = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images:{ type:[], required:true},
  createdAt: { type: Date, default: Date.now },
  category: { type: String, required: true },
  rooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  guests: { type: Number, required: true },
  location: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
  reservations:  [{ type: Schema.Types.ObjectId, ref: 'Reservation' }]
});

module.exports = mongoose.model<IListing>('Listing', listingSchema);

