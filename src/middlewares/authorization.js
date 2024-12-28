//middleware para autorizaciones en http
export const authorization = roles => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send({ error: 'Unauthorized' });
        if (!roles.includes(req.user.role)) return res.status(403).send({ error: 'Not permissions' });
        next();
    };
};

// Middleware de autorización para Socket.IO
export const socketAuthorization = roles => {
    return (socket, next) => {
        const user = socket.handshake.query.user; 

        if (!user) return next(new Error('Unauthorized'));
        if (!roles.includes(user.role)) return next(new Error('Not permissions'));
        next();
    };
};


const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        res.locals.isAdmin = true; 
    } else {
        res.locals.isAdmin = false; 
    }
    next();
};

export default isAdmin;
