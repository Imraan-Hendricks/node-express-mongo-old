exports.logout = (req, res) => {
  const user = req.user;

  req.logout();

  const response = {
    success: true,
    data: {
      isAuthenticated: req.isAuthenticated(),
      user: user,
    },
  };

  res.json(response);
};
