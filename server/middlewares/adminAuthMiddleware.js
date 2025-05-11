import jwt from "jsonwebtoken";

const AdminAuthMiddleware = async(req, res, next)=>
{
    try
    {
        const bearerToken = req.header('Authorization');
        console.log(bearerToken);
        
        const token = bearerToken.split(' ')[1];
        console.log("token",token);
        
        if(!token)  //working on both front & back end
        {
            return res.status(401).json({message: "Token not found!"});
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET_ADMIN);

        if(verified.role !== 'admin')  //working fine
        {
            return res.status(403).json({message: "Forbidden! access restricted to superAdmin only."});
        }
        req.admin = verified;
        next();
        
    }
    catch(err)
    {   
        console.log("Error:", err);
        if(err.name === "TokenExpiredError") //ok
        {
            return res.status(401).json({message: "Session expired. Please log in again!"});
        }
        else if (err.name === 'JsonWebTokenError') //ok
        {
            return res.status(401).json({ message: "Token Mismatch! Unauthorized access!" });
        }
        return res.status(400).json({message: "Error! invalid token!"});
    }
}

export default AdminAuthMiddleware;