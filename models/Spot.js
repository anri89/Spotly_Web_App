import mongoose from "mongoose";

const SpotSchema = new mongoose.Schema({
  title: { type: String, required: true },
  locationName: String,
  description: String,
  vibeTags: [String],
  
  createdAt: { type: Date, default: Date.now },
});

const Spot = mongoose.model("Spot", SpotSchema);
export default Spot;
