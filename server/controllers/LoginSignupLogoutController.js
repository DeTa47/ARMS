require('dotenv').config();
const bcrypt = require('bcrypt');
const UserDetails = require('../schema/UserDetails');
const jwt = require('jsonwebtoken');    

function generateToken (payload, secret, expiry){
    return new Promise((resolve, reject)=>{
            jwt.sign(payload, secret, {expiresIn: expiry}, (err, token)=>{
                if(err){
                    reject(err);
                }

                else{
                    resolve(token);
                }
            })
    });
}

async function hashPassword (pwd){
    try{
        const saltRounds = parseInt(process.env.SALT_ROUNDS);
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(pwd, salt);
    }
    catch(error){
        console.error(error);
    }
   
}

exports.login = async (req, res)=>{

    try{
            const requestData = req.body;
            const userData = await UserDetails.findOne( {
                [`Email`]:requestData.Email
            });

            if (userData === null){
                return res.status(500).send({message:'User does not exist'});
            }

            const type = userData.CustomerType;

            const isPasswordCorrect = await bcrypt.compare(requestData.Password, userData.Password);

            if (isPasswordCorrect) {
                
                const payload = {
                    
                    Name: userData[type][`${type}Name`],
                    Email: userData.Email,
                    CustomerType: userData.CustomerType,
                    EmailVerified: userData.EmailVerification,
                    MobileVerified: userData.MobileNumberVerification,
                    ApprovalStatus: userData.Status
                }

                if (userData.CustomerType === "Individual"){
                    payload.userid = userData._id,
                    payload.Designation = userData[type].IndividualDesignation;
                    payload.Faculty = userData[type].IndividualFaculty;
                    payload.Department = userData[type].IndividualDepartment;
                    payload.PhoneNumber = userData[type].IndividualMobile;
                }

                else{
                    payload.adminid = userData._id
                }

                const aT = await generateToken({ id: userData._id, Email: userData.Email}, process.env.JWT_SECRET, '20s');
                const rT = await generateToken({ id: userData._id, Email: userData.Email}, process.env.JWT_REFRESH_SECRET, '1d');

                userData.refreshToken = rT; 
                await userData.save();

                res.cookie('jwt', rT, { httpOnly: true, secure: false, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
                
                return res.status(201).json({
                    message: 'User Logged in!',
                    accessToken: aT,
                    refreshToken: rT,
                    data: payload
                });
                
                

            } else {
                return res.status(500).send({message:'Invalid Password!'});
            }
    }
    catch(error){

    }

}

exports.register = async (req, res)=> {

    try{
        const requestData = req.body;

        const type = requestData.CustomerType;
        
        const checkEmail = await UserDetails.findOne( {
            
            [`Email`]:requestData.Email
        });

        if (checkEmail !== null){
           return res.status(500).send({message:'User already exists'});
        }

        const hashedPassword = await hashPassword(requestData.Password);

       
        const userData = await UserDetails.create({  
            CustomerType:type,
            Email: requestData.Email,
            Password: hashedPassword,
            [type]: {
                [`${type}Name`]:requestData.Name,
                
            }
         });

        const payload = {
            id: userData._id,
            Name: userData[type][`${type}Name`],
            Email: userData.Email,
            CustomerType: userData.CustomerType,
            EmailVerified: userData.EmailVerification,
            MobileVerified: userData.MobileNumberVerification,
            ApprovalStatus: userData.Status
        }
        
        const aT = await generateToken({Id: userData._id, Email: userData.Email}, process.env.JWT_SECRET, '20s');
        const rT = await generateToken({Id: userData._id, Email: userData.Email}, process.env.JWT_REFRESH_SECRET, '1d');

        res.cookie('jwt', rT, { httpOnly: true, secure: false, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        
        return res.status(201).json({
                message: 'User Registered!',
                accessToken:aT,
                refreshToken:rT,
                data: payload
        });
        
    }
    catch (err){
            console.error(err);
            return res.status(500).send({
                message: err.message
            });
   }
}

exports.Logout = async (req, res)=>{  
        const user = await UserDetails.findOne({Email:req.body.Email});
        if(!user) return res.status(400).send("Invalid user");
        user.refreshToken = '';
        await user.save();
        return res.status(200).send("User Logged Out");

}