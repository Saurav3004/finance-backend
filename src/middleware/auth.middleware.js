import jwt from "jsonwebtoken";

export const authMiddleware =  (req,res,next) => {
    try {
        const header = req.headers.authorization;
        if(!header){
            return res.status(400).json({
                message:"Forbidden"
            })
        }

        if(!header.startsWith("Bearer")){
            return res.status(400).json({
                message:"Forbidden"
            })
        }
        const token = header.split(" ")[1];
        
        if(!token){
            return res.status(400).json({
                message:"You are not authenticated"
            })
        };


        
        const {id,role} = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!id || !role){
            return res.status(401).json({
                message: "You are not authorized"
            })
        };
        req.user = {
            id,role
        };
        next()
    } catch (error) {
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}