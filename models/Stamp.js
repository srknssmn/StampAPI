// models/Stamp.js
import mongoose from 'mongoose';

const StampSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["CITY", "COUNTRY"], required: true },
    city: { type: Schema.Types.ObjectId, ref: "City" },      // type=CITY ise
    country: { type: Schema.Types.ObjectId, ref: "Country" },// type=COUNTRY ise

    level: {
      type: String,
      enum: ["EXPLORE", "SETTLED", "EXPERT", "LEGEND"],
      default: "EXPLORE",
    },
    rarity: {
      type: String,
      enum: ["COMMON", "RARE", "LEGENDARY"],
      default: "COMMON",
    },
    source: {
      type: String,
      enum: ["CHECKIN", "AUTO_COUNTRY", "BUSINESS_QR", "ADMIN"],
      default: "CHECKIN",
    },

    obtainedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Aynı user aynı city için duplicate olmasın:
StampSchema.index(
  { user: 1, type: 1, city: 1, country: 1 },
  { unique: true, sparse: true }
);

module.exports = mongoose.model("Stamp", StampSchema);
