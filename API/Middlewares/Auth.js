import jwt from 'jsonwebtoken'
import { User } from '../Models/User.js';

export const Authenticated = async (req, res, next) => {
    const token = req.header("Auth");

    if (!token) return res.json({ message: "Login first" });

    try {
        const decoded = jwt.verify(token, "$@#%^&*()~");
        // console.log("Decoded Token:", decoded); 

        const id = decoded.userId;
        let user = await User.findById(id);

        if (!user) return res.json({ message: "User not exist" });

        req.user = user._id && user;  // Make sure to set the user ID
         // console.log("User ID in Authenticated middleware:", req.user);  // Log the user ID
        next();
    } catch (error) {
        console.error("Error in Authenticated middleware:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
};





// import jwt from 'jsonwebtoken'
// import { User } from '../Models/User.js'

// export const Authenticated = async (req, res, next) => {
//     const token = req.header("Auth")

//     if(!token) return res.json({message:"Login first"})

//         const decoded = jwt.verify(token, "$@#%^&*()~")

//         const id = decoded.userId
        
//         let user = await User.findById(id)

//         if(!user) return res.json({message: "User not exist"})

//             req.user = user
//             next()
//         // console.log(decoded)
// }