import bcrypt from 'bcrypt';
import UserData from "../models/userModel.js";

const MemberPasswordReset = async(req, res)=>
{
    const {oldPassword, newPassword, confirmPassword} = req.body;

    try
    {
        // const findEmail = await UserData.findOne({email});
        // if(!findEmail)
        // {
        //     return res.status(404).json({message: "Email not found!"});
        // }
        const adminID = req._id;
        console.log("ID:",adminID);
        
        const storedOldPassword = findEmail.password;
        const CompareResult = await bcrypt.compare(oldPassword, storedOldPassword);
        if(!CompareResult)
        {
            return res.status(401).json({message: "Password incorrect!"});
        }
        if(newPassword !== confirmPassword)
        {
            return res.status(400).json({message: "Passwords did not match!"});
        }
        const saltRounds = 10;
        const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);
        const updatedMember = await UserData.updateOne({password: newHashedPassword});
        await updatedMember.save();

        return res.status(201).json({message: "Password updated successfully!"});
    }
    catch(err)
    {
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export default MemberPasswordReset;