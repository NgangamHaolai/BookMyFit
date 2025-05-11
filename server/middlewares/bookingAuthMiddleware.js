import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

const BookingAuthMiddleware = async(req, res, next)=>
{
    try
    {
        const bearerToken = req.header("Authorization");
        const token = bearerToken.split(" ")[1];
        if(!token)
        {
            return res.status(404).json({message: "Error! Token not found!"});
        }
    
        const verified = jwt.verify(token, process.env.JWT_SECRET_MEMBER);
        if(verified.role !== 'member')
        {
            return res.status(403).json({message: "Forbidden! only members can book slot."});
        }
    
        req.user = verified; // Attach user info
        next();
    }
    catch(err)
    {
        if(err.name === 'TokenExpiredError')
        {
            return res.status(401).json({message: "Session expired. Please login again."});
        }
        else if(err.name ==='JsonWebTokenError')
        {
            return res.status(401).josn({message: "Token Mismatch! Unauthorized Access!"});
        }
        console.log(err);
        return res.status(400).json({message: "Something wrong happened while booking slot"});
    }
}

export default BookingAuthMiddleware;