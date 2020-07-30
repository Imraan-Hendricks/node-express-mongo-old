module.exports = (req, res) => {
  const response = {
    success: true,
    data: {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
    },
  };

  res.json(response);
};
