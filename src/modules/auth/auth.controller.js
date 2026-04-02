import { User } from "../user/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const signupAsAdmin = async (req,res) => {
    const {name,email,password} = req.body;

    const IsUser = await User.find();

    if(IsUser.length > 0){
        return res.status(400).json({
            message:"Bad Request"
        })

    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        role:"admin"
    })

    return res.status(201).json({
        message:"Admin registered successfully",
        user
    })
}

export const signup = async (req,res) => {
   try {
     const {name,email,password,role} = req.body;
     if(!name || !email || !password){
         return res.status(400).json({
             message:"Invalid input"
         })
     };

     if(role == "admin"){
        return res.status(400).json({
            message:"You cant signup as Admin"
        })
     }
     const IsUser = await User.findOne({email});

     if(IsUser){
         return res.status(401).json({
             message:"User already registered"
         })
     };

     const hashedPassword = await bcrypt.hash(password,10);
     console.log(hashedPassword)
     const user = await User.create({
         name,
         email,
         password:hashedPassword,
         role
     })
     console.log(user)
     await user.save();
     return res.status(200).json({
         message: "User registered successfully",
         user
     })
   } catch (error) {
    return res.status(500).json({
        message:"Internal Server Error"
    })
   }
};

export const signin = async (req,res) => {
    try {
        const {email,password} = req.body;
        console.log(email,password)
        if(!email || !password){
            return res.status(401).json({
                message:"Invalid input"
            })
        };
        const user = await User.findOne({email});
        console.log(user)
        if(!user){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        };
        const IsPasswordValid = await bcrypt.compare(password,user.password);
        console.log(IsPasswordValid)
        if(!IsPasswordValid){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        };
        const token = jwt.sign({
            _id:user._id,
            role:user.role
        },process.env.JWT_SECRET_KEY);

        return res.status(200).json({
            message:"Login successfully",
            token
        });
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}