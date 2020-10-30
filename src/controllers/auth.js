const passport = require('passport');

const User = require('../models/user');

const ctrl = {};

ctrl.renderSignUp = (req, res) => {
  res.render('authentication/signup', {
    layout: 'nostats'
  });
};

// ctrl.signUp = passport.authenticate('signup', {
//   successRedirect: '/',
//   failureRedirect: '/signup'
// });

ctrl.signUp = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Passwords do not match." });
  }
  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
  }
  if (errors.length > 0) {
    res.render("authentication/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
      layout: 'nostats'
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "The Email is already in use.");
      res.redirect("/signup");
    } else {
      // Saving a New User
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "You are registered.");
      res.redirect("/signin");
    }
  }
};


ctrl.renderSignIn = (req, res) => {
  res.render('authentication/signin', {
    layout: 'nostats'
  });
};




// ctrl.signIn = (req, res) => {
//   //res.send('signin');
//   res.redirect('/')
// };

ctrl.signIn = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/signin",
  failureFlash: true
});

ctrl.logout = (req, res) => {
  req.logout();
  res.redirect('/');
}

module.exports = ctrl;