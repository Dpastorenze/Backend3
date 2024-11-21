
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js'; 

const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies.jwt]),
    secretOrKey: 'thesecret' 
};

passport.use(new Strategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.id);
        
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));

export default passport;