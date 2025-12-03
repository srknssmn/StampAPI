// models/User.js
import mongoose from 'mongoose';

const UserStatsSchema = new Schema({
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  totalCitiesVisited: { type: Number, default: 0 },
  totalCountriesVisited: { type: Number, default: 0 },
  totalCheckIns: { type: Number, default: 0 },
  rareBadgeCount: { type: Number, default: 0 },
  legendaryBadgeCount: { type: Number, default: 0 },
});

const FollowStateSchema = new Schema({
  tier: {
    type: String,
    enum: ["BASIC", "ENHANCED", "PREMIUM"],
    default: "BASIC",
  },
  canFollow: { type: Boolean, default: false },
});

const UserProfileSchema = new Schema({
  displayName: { type: String, required: true },
  avatarUrl: String,
  bio: String,
  homeCity: { type: Schema.Types.ObjectId, ref: "City" },
});

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },

    profile: { type: UserProfileSchema, required: true },
    stats: { type: UserStatsSchema, default: () => ({}) },
    followState: { type: FollowStateSchema, default: () => ({}) },

    // ilişkiler genelde ayrı koleksiyonlarda => sadece sayıları burada tutuyoruz:
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },

    lastActiveAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);