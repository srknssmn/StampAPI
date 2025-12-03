// models/Follow.js
import mongoose from 'mongoose';

const FollowSchema = new Schema(
  {
    follower: { type: Schema.Types.ObjectId, ref: "User", required: true },
    followee: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["ACTIVE", "BLOCKED", "MUTED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

FollowSchema.index({ follower: 1, followee: 1 }, { unique: true });

module.exports = mongoose.model("Follow", FollowSchema);
