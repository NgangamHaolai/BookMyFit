import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

const MemberAuthMiddleware = (req, res, next)=>
{
    try
    {
        const bearerToken = req.header('Authorization');
        // console.log("Middleware-Token: ",bearerToken);
        
        const token = bearerToken.split(' ')[1];
        if(!token)
        {           //Only One Registration possible per email!
            return res.status(401).json({message: "No token found!"});
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET_MEMBER);

        if(verify.role !== 'member' )
        {
            return res.status(403).json({message: "Forbidden! access restricted to members only!"});
        }
        req.user = verify;
        // console.log(req.user);
        next();
    }
    catch(err)
    {
        if(err.name === "JsonWebTokenError")
        {
            return res.status(401).json({message: "Secret or Public Key must be provided!...Redirecting"});
        }
        if(err.name === "TokenExpiredError")
        {
            return res.status(401).json({message: "JWT Token has Expired..Please login again..."});
        }
        console.log(err);
        return res.status(401).json({message: "Error! invalid Token!"});
    }
}
export default MemberAuthMiddleware