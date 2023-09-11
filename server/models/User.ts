import mongoose, { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  image: string;
  favorites: Types.ObjectId[];
  listings: Types.ObjectId[];
  reservations: Types.ObjectId[];
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  image: { type: String },
  name: { type: String, required: true },
  favorites: [{ type: Schema.Types.ObjectId , ref:'Listing'}],
  listings: [{ type: Schema.Types.ObjectId, ref: 'Listing' }],
  reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }],
});

module.exports = mongoose.model<IUser>('User', userSchema);

