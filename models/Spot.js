import mongoose from "mongoose";

const spotSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    locationName: { type: String, required: true },
    description: { type: String, default: "" },
    vibeTags: [{ type: String }],
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },

    
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Spot", spotSchema);
