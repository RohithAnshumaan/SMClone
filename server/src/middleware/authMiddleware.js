import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try{
        const token = req.cookies.authToken;
        if(!token){
            return res.status(403).json({msg : "No token provided."})
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err){
                return res.status(403).json({
                    msg : "Invalid or expired token."
                })
            }
            req.user = user;
            next();
        })
    } catch(err){
        console.log(err);
        return res.status(400).json({
            msg : 'Internal server error'
        })
    }
}

export default authMiddleware;