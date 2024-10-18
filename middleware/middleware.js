const getProfile = async (req, res, next) => {
  const profile = { user: "Hello" };
  if (!profile) return res.status(401).end();
  req.profile = profile;
  next();
};

module.exports = { getProfile };
