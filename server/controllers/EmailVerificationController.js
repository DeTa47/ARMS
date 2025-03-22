const UserDetails = require('../schema/UserDetails');
const EmailGenerator = require('../utils/EmailGenerator');


exports.verifyUser = async (req,res)=>{
    try{
        const requestData = req.body;
        const user = await UserDetails.findOne({
            Email: requestData.Email
        });

        if(user === null) return res.status(400).send("Invalid user");

        user.EmailVerification = true;

        await user.save();

        return res.status(200).send({ msg: "User Verified"})


    } catch(error){
        return res.status(500).send(error);
    }

    

}

exports.sendVerifMail = async (req, res)=>{
    try{
        
        const requestData = req.body;
        const email = requestData.Email;

        verifCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

        EmailGenerator(email, verifCode);

        return res.status(201).send({msg:'Email Sent', code:verifCode});

    }
    catch(err){
        console.error(err);
        return res.status(500).send({msg: err})
    }
}