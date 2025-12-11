import Spot from "../models/Spot.js";


export const addSpotPage = (req, res) => {
  res.render("addSpot");
};


export const createSpot = async (req, res) => {
  try {
    const newSpot = new Spot(req.body);
    await newSpot.save();
    res.redirect("/explore");
  } catch (err) {
    console.error(err);
    res.status(500).send(" saving spot");
  }
};


export const friendsPage = (req, res) => {
  
  const matches = [
    { name: "Ella", shared: ["chill cafes", "cozy pubs"] },
    { name: "Ben", shared: ["open parks"] },
    { name: "Kayla", shared: ["creative hangouts"] },
  ];
  res.render("friends", { matches });
};
