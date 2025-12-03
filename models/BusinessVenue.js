// models/BusinessVenue.js
import mongoose from 'mongoose';

const BusinessVenueSchema = new Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["CAFE", "PUB", "RESTAURANT", "HOTEL", "OTHER"],
      default: "OTHER",
    },
    city: { type: Schema.Types.ObjectId, ref: "City", required: true },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // [lng, lat]
    },
  },
  { timestamps: true }
);

BusinessVenueSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("BusinessVenue", BusinessVenueSchema);
