import User from "../Models/User.js";

const checkRole = (...roles) => {
    return async (req  ,res , next) =>{
        try {
            const user = await User.findById(req.user);

            if(!user){
                return res.status(404).json({
                    success : false,
                    message : "User not found",
                });
            }

            if(!roles.includes(user.role)){
                return res.status(403).json({
                    success : false,
                    message : "You are not authorized to perform this action",
                });
            }

            next();
        } 
        catch (error) {
            console.log(error);
            return res.status(500).json({
                success : false,
                message : error.message,
            });
        }
    }
}

export default checkRole;