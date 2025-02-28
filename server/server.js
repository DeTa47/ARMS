require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const app = express();
const EmailGenerator = require('./utils/EmailGenerator')
const UserDetails = require('./schema/UserDetails');
mongoose.connect(process.env.DB_URI).then(console.log('DB connected')).catch((err)=>console.error(err));

let corsOptions = {
    origin: ['http://localhost:5173']
}
app.use(bodyParser.json());
app.use(cors(corsOptions));

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



function generateToken (payload){
    return new Promise((resolve, reject)=>{
            jwt.sign(payload, process.env.JWT_SECRET, (err, token)=>{
                if(err){
                    reject(err);
                }

                else{
                    resolve(token);
                }
            })
    });
}

app.patch('/verifyUser', async (req,res)=>{
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

    

})

app.post ('/sendVerifMail', async (req, res)=>{
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
})

app.post('/login', async (req, res)=>{

    try{
            const requestData = req.body;
            const userData = await UserDetails.findOne( {
                [`Email`]:requestData.Email
            });

            if (userData === null){
                return res.status(500).send({message:'User does not exist'});
            }

            const type = userData.CustomerType;

            const hashedPassword = await hashPassword(requestData.Password);

            const isPasswordCorrect = bcrypt.compare(requestData.Password, hashedPassword);

            if (isPasswordCorrect) {
                
                const payload = {
                    id: userData._id,
                    Name: userData[type][`${type}Name`],
                    Email: userData.Email,
                    CustomerType: userData.CustomerType,
                    EmailVerified: userData.EmailVerification,
                    MobileVerified: userData.MobileNumberVerification,
                    ApprovalStatus: userData.Status
                }
                const token = await generateToken(payload);

                return res.status(201).json({
                    message: 'User Logged in!',
                    token: token,
                    data: payload
                });
                

            } else {
                console.log("Invalid credentials.");
            }
    }
    catch(error){

    }

});

app.post('/register', async (req, res)=> {

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
        
        const token = await generateToken(payload);


        return res.status(201).json({
                message: 'User Registered!',
                token:token,
                data: payload
        });
        
    }
    catch (err){
            console.error(err);
            return res.status(500).send({
                message: err.message
            });
   }
});

const server = app.listen(process.env.PORT, () => {

    console.log(`Server started at: http://${server.address().address}${server.address().port}`);
});