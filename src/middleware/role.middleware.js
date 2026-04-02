export const roleMiddleware = (...roles) => {
    return (req,res,next) => {
    try {
        if(!roles.includes(req.user.role)){
            return res.status(400).json({
                message:"You have not access for this"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}
}