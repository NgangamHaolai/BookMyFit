import bcrypt from 'bcrypt';
import AdminData from "../models/adminModel.js";

const AdminPasswordReset = async(req, res)=>
{
    const {oldPassword, newPassword, confirmPassword} = req.body;

    try
    {
        // const findEmail = await UserData.findOne({email});
        // if(!findEmail)
        // {
        //     return res.status(404).json({message: "Email not found!"});
        // }
        const adminID = req.admin.id;
        const findAdmin = await AdminData.findOne({ _id: adminID });
        console.log(adminID);
        console.log(findAdmin);
        
        
        const storedOldPassword = findAdmin.password;
        console.log(storedOldPassword);
        
        const CompareResult = await bcrypt.compare(oldPassword, storedOldPassword);
        if(!CompareResult)
        {
            return res.status(401).json({message: "Password entered is incorrect!"});
        }
        if(newPassword !== confirmPassword)
        {
            return res.status(400).json({message: "Passwords did not match!"});
        }
        const saltRounds = 10;
        const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

        const updatedAdmin = await AdminData.findOneAndUpdate({_id: adminID}, {password: newHashedPassword});
        await updatedAdmin.save();

        return res.status(201).json({message: "Password updated successfully!"});
    }
    catch(err)
    {
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export default AdminPasswordReset;