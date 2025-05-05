import UserData from "../models/userModel.js";
import bcrypt from 'bcrypt';

const Register = async(req, res)=>
{
    try
    {
        const {Fname, Lname, email, phoneNo, password, conPassword} = req.body;
        
        if(password !== conPassword)
        {
            return res.status(400).json({message: "Passwords did not match!"});
        }
        let name = Fname + Lname;
        const findUser = await UserData.findOne({email: email});
        if(findUser)
        {
            return res.status(409).json({message: "Email already exists!"});
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new UserData({name: name, email: email, phoneNo: phoneNo, password: hashedPassword, permission: "Basic" });
        console.log(newUser);
        
        await newUser.save();
        res.status(201).json({message: "User Registered successfully!"});
    }
    catch(err)
    {
        res.status(500).json({message: "Internal Server Error!"});
        console.log(err);
    }
}
export default Register;