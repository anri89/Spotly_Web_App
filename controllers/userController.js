
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Spot from "../models/Spot.js";

const getInitials = (name = "") => {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] || "U";
  const second = parts[1]?.[0] || "";
  return (first + second).toUpperCase();
};

const buildVibeSummary = (spots = []) => {
  const counts = {};
  for (const s of spots) {
    for (const v of s.vibeTags || []) {
      const key = String(v).toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([vibe, count]) => ({ vibe, count }));
};


// get/users/register
export const getRegister = (req, res) => {
  res.render("register", {
    error: null,
    form: {},
    isLoggedIn: !!req.session.userId,
  });
};

// post/users/register
export const postRegister = async (req, res) => {
  try {
    const { username, email, password, displayName } = req.body;

    const existing = await User.findOne({
      $or: [{ username }, { email }],
    }).lean();

    if (existing) {
      return res.status(400).render("register", {
        error: "Username or email already exists.",
        form: req.body,
        isLoggedIn: !!req.session.userId,
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      displayName: displayName || username,
      passwordHash,
      savedSpots: [],
    });

    req.session.userId = user._id.toString();
    return res.redirect("/users/profile");
  } catch (err) {
    return res.status(400).render("register", {
      error: err.message,
      form: req.body,
      isLoggedIn: !!req.session.userId,
    });
  }
};


export const getLogin = (req, res) => {
  res.render("login", {
    error: null,
    form: {},
    isLoggedIn: !!req.session.userId,
  });
};


export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).render("login", {
        error: "Invalid email or password.",
        form: req.body,
        isLoggedIn: !!req.session.userId,
      });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(400).render("login", {
        error: "Invalid email or password.",
        form: req.body,
        isLoggedIn: !!req.session.userId,
      });
    }

    req.session.userId = user._id.toString();
    return res.redirect("/users/profile");
  } catch (err) {
    return res.status(400).render("login", {
      error: err.message,
      form: req.body,
      isLoggedIn: !!req.session.userId,
    });
  }
};


export const postLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};


export const getProfile = async (req, res) => {
  try {
    
    if (!req.session.userId) {
      const guestSpots = req.session.tempSpots || [];
      return res.render("profile", {
        user: null,
        spots: guestSpots,
        vibeSummary: buildVibeSummary(guestSpots),
        isLoggedIn: false,
      });
    }

    const user = await User.findById(req.session.userId).lean();
    if (!user) return res.redirect("/users/login");

    const spots = await Spot.find({ userId: req.session.userId })
      .sort({ createdAt: -1 })
      .lean();

    return res.render("profile", {
      user,
      spots,
      vibeSummary: buildVibeSummary(spots),
      isLoggedIn: true,
    });
  } catch (err) {
    console.error("getProfile error:", err);
    return res.status(500).render("error", { message: "Could not load profile." });
  }
};

export const getFriendsPage = (req, res) => {
  return res.render("friends", {
    matches: [],
    isLoggedIn: !!req.session.userId,
  });
};

export const postFindMatches = async (req, res) => {
  try {
   
    if (!req.session.userId) {
      const demo = [
        { name: "Tom Edwards", shared: ["chill", "coffee"], initials: "TE" },
        { name: "Emma Lewis", shared: ["artsy", "music"], initials: "EL" },
        { name: "Jay Patel", shared: ["party", "nightlife"], initials: "JP" },
      ];
      return res.render("friends", {
        matches: demo,
        isLoggedIn: false,
      });
    }

    const mySpots = await Spot.find({ userId: req.session.userId }).lean();
    const myVibes = new Set(
      mySpots.flatMap(s => (s.vibeTags || []).map(v => String(v).toLowerCase()))
    );

    const otherUsers = await User.find({ _id: { $ne: req.session.userId } }).lean();

    const matches = otherUsers
      .map(u => {
        const name = u.displayName || u.username || "Spotly User";
        const shared = [...myVibes].slice(0, 3);
        return { name, initials: getInitials(name), shared };
      })
      .slice(0, 9);

    return res.render("friends", {
      matches,
      isLoggedIn: true,
    });
  } catch (err) {
    console.error("postFindMatches error:", err);
    return res.render("friends", {
      matches: [],
      isLoggedIn: !!req.session.userId,
    });
  }
};
