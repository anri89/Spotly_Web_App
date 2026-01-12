import Spot from "../models/Spot.js";
import User from "../models/User.js";

export const addSpotPage = (req, res) => {
  res.render("addSpot");
};

export const createSpot = async (req, res) => {
  try {
    const { title, locationName, description } = req.body;

    let vibeTags = req.body.vibeTags || [];
    if (typeof vibeTags === "string") vibeTags = [vibeTags];

    vibeTags = vibeTags
      .map((t) => String(t).trim().toLowerCase())
      .filter(Boolean);

    // guest
    if (!req.session?.userId) {
      req.session.tempSpots = req.session.tempSpots || [];
      req.session.tempSpots.unshift({
        _id: `temp_${Date.now()}`,
        title,
        locationName,
        description,
        vibeTags,
        lat: Number(req.body.lat) || null,
        lng: Number(req.body.lng) || null,
        createdAt: new Date(),
      });
      return res.redirect("/explore");
    }

    // Logged in
    const spot = await Spot.create({
      title,
      locationName,
      description,
      vibeTags,
      userId: req.session.userId,
      lat: Number(req.body.lat) || null,
      lng: Number(req.body.lng) || null,
    });

    
    await User.findByIdAndUpdate(
      req.session.userId,
      { $addToSet: { savedSpots: spot._id } },
      { new: true }
    );

    return res.redirect("/explore");
  } catch (err) {
    console.error(err);
    return res.status(500).render("error", { message: "Could not create spot." });
  }
};
