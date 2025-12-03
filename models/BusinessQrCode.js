// models/BusinessQrCode.js
import mongoose from 'mongoose';

const BusinessQrCodeSchema = new Schema(
  {
    business: { type: Schema.Types.ObjectId, ref: "BusinessVenue", required: true },
    codeValue: { type: String, required: true, unique: true }, // encrypted payload
    expiresAt: Date,

    // QR ile verilecek ödül
    reward: {
      city: { type: Schema.Types.ObjectId, ref: "City" },
      cityPoint: { type: Schema.Types.ObjectId, ref: "CityPoint" },
      badge: { type: Schema.Types.ObjectId, ref: "BadgeDefinition" },
      bonusXp: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BusinessQrCode", BusinessQrCodeSchema);
