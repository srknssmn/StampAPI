// models/BadgeInstance.js
import mongoose from 'mongoose';

const BadgeInstanceSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    badge: { type: Schema.Types.ObjectId, ref: "BadgeDefinition", required: true },
    obtainedAt: { type: Date, default: Date.now },
    progress: {
      current: { type: Number, default: 0 },
      target: { type: Number, default: 1 },
    },
  },
  { timestamps: true }
);

BadgeInstanceSchema.index({ user: 1, badge: 1 }, { unique: true });

module.exports = mongoose.model("BadgeInstance", BadgeInstanceSchema);
