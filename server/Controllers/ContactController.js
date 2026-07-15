import Contact from "../Models/Contact.js";

const createContact = async(req , res)=>{
    try {
        const { fullName , email , subject , message} = req.body;

        if(!fullName || !email || !subject || !message){
            return res.status(400).json({
                success : false,
                message:"All fields are required"
            });
        }

        const contact = await Contact.create({
            fullName,
            email,
            subject,
            message
        });

        return res.status(200).json({
            success : true,
            message:"Contact created successfully",
            contact
        });
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message:"Internal server error",
            error:error.message
        });
    }
}

export {createContact}