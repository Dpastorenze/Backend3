const userMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        req.user = req.session.user;
        res.locals.user = req.user;
        res.locals.isAdmin = req.user.role === 'admin';
    } else {
        req.user = null;
        res.locals.user = null;
        res.locals.isAdmin = false;
    }
    next();
};





export default userMiddleware;
