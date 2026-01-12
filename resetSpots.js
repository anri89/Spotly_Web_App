import "dotenv/config";
import mongoose from "mongoose";
import Spot from "./models/Spot.js";

async function resetSpots() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const result = await Spot.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} spots`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error deleting spots:", err);
    process.exit(1);
  }
}

resetSpots();
