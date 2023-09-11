import mongoose, { Document, Schema } from "mongoose";

export interface IReservation extends Document {
  userId: mongoose.Types.ObjectId;
  listing: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  guests: number;
  totalPrice: number;
  createdAt: Date;
}

const reservationSchema: Schema<IReservation> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  listing: { type: Schema.Types.ObjectId, ref: "Listing" },
  startDate: { type: Date },
  endDate: { type: Date },
  guests: { type: Number },
  totalPrice: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

reservationSchema.index({ userId: 1 }, { unique: false });

module.exports = mongoose.model<IReservation>("Reservation", reservationSchema);
