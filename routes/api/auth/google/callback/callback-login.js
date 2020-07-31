module.exports = async (req, res) => {
  const user = req.body.user;

  req.logIn(user, (err) => {
    if (err) {
      console.log([
        {
          location: 'passport',
          msg: 'An error has occured. Please try again',
          param: 'general',
          value: '',
        },
      ]);

      return res.redirect('/');
    }

    res.redirect('/');
  });
};
