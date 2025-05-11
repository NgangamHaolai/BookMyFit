import AdminData from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

 const LoginAdmin = async(req, res)=>
{
    const {email, password} = req.body;    
    try
    {
        const findAdmin = await AdminData.findOne({email: email});

        if(!findAdmin)
        {       
            return res.status(404).json({message: "Email not found!"});
        }
        const storedPassword = findAdmin.password;
        const hashedPassword = await bcrypt.compare(password, storedPassword);
        
        if(!hashedPassword)
        {
            return res.status(401).json({message: "Incorrect Password"});
        }
        // const allowedRoles = ['admin', 'superAdmin'];
        // if (!allowedRoles.includes(findAdmin.role)) {
        //     return res.status(403).json({ message: "Forbidden!" });
        // }
        if(findAdmin.role !== 'admin') // && findAdmin.role !== 'superAdmin'
        {
            return res.status(403).json({message: "Forbidden!"});
        }
                                                    //role: findAdmin.role
        const token = jwt.sign({id: findAdmin._id, role: findAdmin.role}, process.env.JWT_SECRET_ADMIN, {expiresIn: '10m'});
        console.log("Token: ",token)
        return res.status(200).json({message: "Logged In!", token});
    }
    catch(err)
    {
        res.status(500).json({message: "Internal Server Error!"});
        console.log(err);
        
    }
}
export default LoginAdmin;

const AddNewAdmin = async(req, res)=>
{
    const {name, email, password} = req.body;
    console.log("NAME:"+name )
    console.log("EMAIL:"+email+"PASSWORD:"+password);
    
    try
    {   
        const findAdmin = await AdminData.findOne({email: email});
        // console.log(findAdmin);
        if(findAdmin)   //working
        {
            return res.status(409).json({message: "Email already exists!"});
        }
        // if(findAdmin.role !== 'superAdmin')
        // {
        //     return res.status(403).json({message: "Access Restricted to SuperAdmin only!"});
        // }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newAdmin = new AdminData({name: name, email: email, password: hashedPassword});
        
        await newAdmin.save();
        // console.log("newAdmin:", newAdmin);
        return res.status(201).json({message: "New Admin added!"});
    }
    catch(err)
    {
        console.log(err.response)
        res.status(500).json({message: "Internal Server Error!"});
    }
}
    
export {AddNewAdmin};