const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./User')

function initialize(passport) {
    const authUser = async (username, password, done) => {
        const currentUser = User.find(username, async targetUser => {

            if (targetUser === null || targetUser === undefined) {
                return done(null, false, {message: "No such user."});
            }

            try {
                if (await bcrypt.compare(password, targetUser.password)) {
                    console.log("Success!")
                    return done(null, targetUser)

                } else {
                    return done(null, false, {message: 'Password mismatch.'});
                }

            } catch (e) {
                return done(e);
            }
        })

    };


    passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'}, authUser));

    passport.serializeUser((user, done) => {
        return done(null, user.userName)
    });

    passport.deserializeUser((username, done) => {
        User.find(username, row => {
            if (!row) return done(null, false);
            return done(null, row);
        })
    })

}

module.exports = initialize;