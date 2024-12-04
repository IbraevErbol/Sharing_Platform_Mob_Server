import jwt from 'jsonwebtoken'
export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    // console.log('Authorization Header:', req.headers['authorization']);
    if(!token){
        return res
            .status(403)
            .json({message: 'Токен не предоставлен'});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res
                .status(403)
                .json({message: 'Неверный или истекший токен'});
        }
        // console.log('Decoded token:', decoded);
        if(!decoded.userId){
            return res.status(403).json({message: 'Некорректный токен'})
        }
        req.user = { _id: decoded.userId };
        
        next();
    })
}