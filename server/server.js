require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const EmailGenerator = require('./utils/EmailGenerator')
const UserDetails = require('./schema/UserDetails');
const GroupDetails = require('./schema/Groups');
const researchRoutes = require('./routes/researchRoutes');
const verifyJWT = require('./middleware/verifyToken');
const cvgen = require('./utils/CVGenerator');


mongoose.connect(process.env.DB_URI).then(console.log('DB connected')).catch((err)=>console.error(err));

let corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
}
//app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());

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
app.patch('/Logout', async (req, res)=>{  
        const user = await UserDetails.findOne({Email:req.body.Email});
        if(!user) return res.status(400).send("Invalid user");
        user.refreshToken = '';
        await user.save();
        return res.status(200).send("User Logged Out");

  });
app.get('/refresh', async (req, res)=>{

    try{
        const cookies = req.headers;
        console.log(cookies);
        if (!cookies?.jwt) return res.status(401).json({message: 'No token found'});
        console.log('exit');
        const refreshToken = cookies.jwt;
        console.log('Refresh Token',refreshToken);
        const foundUser = await UserDetails.findOne({refreshToken});
        
        if (!foundUser) return res.sendStatus(403);

        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET,
            (err, decoded) => {
                if (err || foundUser.Email !== decoded.Email) return res.sendStatus(403);
                //const roles = Object.values(foundUser.roles);
                const accessToken = generateToken({Id: foundUser._id, Email: foundUser.Email}, process.env.JWT_SECRET, '20s');
                res.json({ accessToken })
            }
        );

    }
    catch(error){

    }
});

app.get('/getGroups', async (req, res)=>{
    try{
        const groups = await GroupDetails.find();
        res.status(200).json(groups);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Error fetching groups'});
    }
})


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

app.post('/generateCV', async (req, res)=>{

    try{
        const userId = req.body.userId;
        const outputPath = req.body.outputPath;
        cvgen.generateConsultancyPDF(userId, outputPath);
        res.status(200).send('CV Generated!');
    }
    catch(error){
        console.error(error);
    }
});

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

            

            const isPasswordCorrect = await bcrypt.compare(requestData.Password, userData.Password);

            

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
});

app.use('/', researchRoutes);

const server = app.listen(process.env.PORT, () => {

    console.log(`Server started at: http://${server.address().address}${server.address().port}`);
});