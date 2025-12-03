// models/CityPoint.js
import mongoose from 'mongoose';

const CityPointSchema = new Schema(
  {
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
      index: true,
    },

    name: { type: String, required: true },
    description: String,

    type: {
      type: String,
      enum: [
        "LANDMARK",       // Tarihi/ikonik yerler (Ayasofya, Kız Kulesi)
        "SQUARE",         // Meydanlar (Taksim, Konak)
        "STATION",        // Tren/otobüs istasyonları
        "AIRPORT",        // Havalimanları
        "MUSEUM",         // Müzeler
        "BEACH",          // Sahil/plaj noktaları
        "VIEWPOINT",      // Manzara/seyir noktaları
        "FOOD_SPOT",      // Yeme-içme hotspot’ları
        "TRANSPORT_HUB",  // Büyük aktarma merkezleri
        "OTHER",          // Diğer
      ],
      default: "LANDMARK",
      index: true,
    },

    // GeoJSON konum
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],   // [lng, lat]
        required: true,
      },
    },

    // Kullanıcı bu noktaya ne kadar yaklaşınca "tamam" sayılacak (metre)
    radiusMeters: {
      type: Number,
      default: 150,
      min: 10,
      max: 2000,
    },

    // İleride işine yarayabilir: etiketler (ör. ["sunrise", "sea_view"])
    tags: {
      type: [String],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Geo sorgular için 2dsphere index
CityPointSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("CityPoint", CityPointSchema);