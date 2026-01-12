import User from "../models/User.js";
import Spot from "../models/Spot.js";

const buildVibeSummary = (spots = []) => {
  const counts = {};
  for (const s of spots) {
    for (const v of (s.vibeTags || [])) {
      const key = String(v).toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([vibe, count]) => ({ vibe, count }));
};

export const profilePage = async (req, res) => {
  
  if (!req.session.userId) {
    return res.render("profile", {
      user: null,
      spots: req.session.tempSpots || [],
      vibeSummary: buildVibeSummary(req.session.tempSpots || []),
    });
  }

  const user = await User.findById(req.session.userId).lean();

  const spots = await Spot.find({ userId: req.session.userId })
    .sort({ createdAt: -1 })
    .lean();

  res.render("profile", {
    user,
    spots,
    vibeSummary: buildVibeSummary(spots),
  });
};
