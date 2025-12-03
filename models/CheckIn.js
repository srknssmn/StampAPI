// models/CheckIn.js
import mongoose from 'mongoose';

const GeoSnapshotSchema = new Schema({
  type: { type: String, enum: ["Point"], default: "Point" },
  coordinates: { type: [Number], required: true }, // [lng, lat]
  accuracyMeters: Number,
  capturedAt: { type: Date, default: Date.now },
});

const VerificationDetailsSchema = new Schema({
  verifierType: {
    type: String,
    enum: ["SYSTEM", "MODERATOR", "BUSINESS"],
    default: "SYSTEM",
  },
  reason: String,
  score: Number,
});

const CheckInSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    city: { type: Schema.Types.ObjectId, ref: "City", required: true },
    cityPoint: { type: Schema.Types.ObjectId, ref: "CityPoint" },

    method: {
      type: String,
      enum: ["GPS", "CITY_POINT", "BUSINESS_QR", "PHOTO", "TICKET"],
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "VERIFIED", "REJECTED"],
      default: "PENDING",
      index: true,
    },

    locationSnapshot: { type: GeoSnapshotSchema, required: true },

    verificationDetails: VerificationDetailsSchema,
    verifiedAt: Date,
  },
  { timestamps: true }
);

// Geo sorgu için
CheckInSchema.index({ "locationSnapshot": "2dsphere" });
CheckInSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("CheckIn", CheckInSchema);
