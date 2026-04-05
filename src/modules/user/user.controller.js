import { errorMiddleware } from "../../middleware/error.middleware.js";
import {User} from "../user/user.model.js"

export const getUsers = async (req,res) => {
    try {
        const users = await User.find().select("-password");
        return res.status(200).json({
            allUsers:users
        })
    } catch (error) {
        throw new errorMiddleware;
    }
}

export const updateRole = async (req,res) => {
    try {
        const userId = req.params.id;
        const {role} = req.body;
        if(!userId){
            return res.status(400).json({
                message:"Please provide userId"
            })
        };

    if (!["viewer", "analyst","admin"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role"
      });
    }

        const user = await User.findByIdAndUpdate({_id:userId},
            {role},
            {new:true}
        );
        user.save();

        return res.status(201).json({
            message:"Role updated successfully",
            user
        });

    } catch (error) {
        return res.status(401).json({
            message:"Internal Server Error"
        })
    }
}

export const updateStatus = async (req,res) => {
    try {
        const userId = req.params.id;
        const {status} = req.body;
        if(!userId || !status){
            return res.status(400).json({
                message:"Please provide valid input"
            })
        };
        const updatedUser = await User.findByIdAndUpdate({_id:userId},{status},{new:true});
        return res.status(201).json({
            message:"Status updated successfully",
            updatedUser
        })

    } catch (error) {
        return res.status(400).json({
            message:"Internal server error"
        })
    }
}