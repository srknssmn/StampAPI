// models/BadgeDefinition.js
import mongoose from 'mongoose';

const BadgeDefinitionSchema = new Schema(
  {
    code: { type: String, required: true, unique: true }, // "ROAD_RUNNER"
    name: { type: String, required: true },
    description: String,
    category: {
      type: String,
      enum: ["CITY", "THEME", "TIME_LIMITED"],
      required: true,
    },
    rarity: {
      type: String,
      enum: ["COMMON", "RARE", "LEGENDARY"],
      default: "COMMON",
    },
    iconUrl: String,

    // MVP için esnek bırakabiliriz:
    criteria: {
      minCitiesVisited: Number,
      minCountriesVisited: Number,
      requiredCityIds: [{ type: Schema.Types.ObjectId, ref: "City" }],
      requiredTags: [String], // "SUNRISE", "NIGHT", vs.
      timeWindow: {
        start: Date,
        end: Date,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BadgeDefinition", BadgeDefinitionSchema);
