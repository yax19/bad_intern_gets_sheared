const isSignedIn = (req, res, next) => {

    // If the user has valid session, proceed
    if (req.session.user) {
        return next();
    }

    // Otherwise, send them to the sign in
    res.redirect('/auth/sign-in');
  };
  
  module.exports = isSignedIn;