// models/Country.js
import mongoose from 'mongoose';

const CountrySchema = new Schema(
  {
    code: { type: String, required: true, unique: true }, // "TR"
    name: { type: String, required: true },               // "Türkiye"
    totalCities: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Country", CountrySchema);
