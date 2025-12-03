// models/City.js
import mongoose from 'mongoose';

const CitySchema = new Schema(
  {
    name: { type: String, required: true },
    country: { type: Schema.Types.ObjectId, ref: "Country", required: true },
    // Şehrin merkez koordinatı (analiz / sıralama vs. için)
    center: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // [lng, lat]
    },
  },
  { timestamps: true }
);

CitySchema.index({ center: "2dsphere" });

module.exports = mongoose.model("City", CitySchema);
