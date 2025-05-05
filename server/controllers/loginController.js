import UserData from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Login = async(req, res)=>
{
    try
    {
        const {email, password} = req.body;
        const findUser = await UserData.findOne({email: email});
        if(!findUser)
        {
            return res.status(404).json({message: "Sorry, email not found!"});
        }

        if(findUser.role !== 'member')
        {
            return res.status(403).json({message: "Access restricted to members only!"});
        }

        const storedPassword = findUser.password;
        const matchedPassword = await bcrypt.compare(password, storedPassword);
        if(!matchedPassword)
        {
            return res.status(401).json({message: "Password did not match!"});
        }
        
        const token = jwt.sign({id: findUser._id, role: findUser.role}, process.env.JWT_SECRET_MEMBER, {expiresIn: '10hr'});
        return res.status(200).json({message: "User logged in.", token});

    }
    catch(err)
    {
        
        console.log(err)
        res.status(500).json({message: "Internal Server Error!"});

    }
}

export default Login;