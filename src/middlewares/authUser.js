import passport from 'passport';

export const authUser = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ status: 'error', message: 'No autorizado' });
        req.user = user;
        next();
    })(req, res, next);
};

