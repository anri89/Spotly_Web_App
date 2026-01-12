import Spot from "../models/Spot.js";

export const homePage = (req, res) => {
  res.render("home", {
    isLoggedIn: !!req.session.userId,
  });
};


export const explorePage = async (req, res) => {
  try {
    const vibeRaw = req.query.vibe || "";
    const vibe = String(vibeRaw).trim().toLowerCase();

    // query
    const query = vibe ? { vibeTags: vibe } : {};

    // spots
    const dbSpots = await Spot.find(query).sort({ createdAt: -1 }).lean();

    
    const tempSpots = req.session.tempSpots || [];

   
    const filteredTemp = vibe
      ? tempSpots.filter(s =>
          (s.vibeTags || []).map(x => String(x).toLowerCase()).includes(vibe)
        )
      : tempSpots;

    
    const spots = [...filteredTemp, ...dbSpots];

    return res.render("explore", {
      spots,
      vibe: vibeRaw,
      isLoggedIn: !!req.session.userId,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .render("error", { message: "Could not load explore page." });
  }
};
