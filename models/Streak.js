// models/Streak.js
import mongoose from 'mongoose';

const StreakSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["DAILY_CHECKIN", "WEEKLY_CITY_VISIT", "MONTHLY_TRAVEL"],
      required: true,
    },
    currentCount: { type: Number, default: 0 },
    longestCount: { type: Number, default: 0 },
    lastActivityDate: { type: Date },
  },
  { timestamps: true }
);

StreakSchema.index({ user: 1, type: 1 }, { unique: true });

module.exports = mongoose.model("Streak", StreakSchema);
