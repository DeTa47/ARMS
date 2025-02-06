require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const UserDetails = require('./schema/UserDetails');

mongoose.connect(process.env.DB_URI).then(console.log('DB connected')).catch((err)=>console.error(err));

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

app.post('/register', async (req, res)=> {

    try{
        const requestData = await req.body;
        
        const hashedPassword = await hashPassword(requestData.Password);

        if (requestData.CustomerType === "Admin"){

                const userData = await UserDetails.create({
                    CustomerType:requestData.CustomerType,
                    Admin:{
                        AdminName:requestData.Name,
                        AdminEmail: requestData.Email,
                        AdminPassword: hashedPassword
                    },
                    
                });

                console.log('User Data generated',userData);

                const savedUser = await userData.save();
                console.log("User Saved Succesfully:", savedUser);


                return res.status(201).send({
                    message: 'User Registered:',
                    data: savedUser
                });
        }
        else if(requestData.CustomerType === 'Individual'){
            const userData = await UserDetails.create({
                CustomerType:requestData.CustomerType,
                Individual:{
                    IndName:requestData.Name,
                    IndEmail: requestData.Email,
                    IndPassword: hashedPassword
                },
                RegisteredOn: requestData.time,
            });

            const savedUser = await userData.save();
            console.log("User Saved Succesfully:", savedUser);

            return res.status(201).send({
                message: 'User Registered',
                data:savedUser
            });
        }
        else{
            const userData = await UserDetails.create({
                CustomerType:requestData.CustomerType,
                Organization:{
                    OrgName:requestData.Name,
                    OrgEmail: requestData.Email,
                    OrgPassword: hashedPassword
                },
                RegisteredOn: requestData.time,
            });

            const savedUser = await userData.save();
            console.log("User Saved Succesfully:", savedUser);

            return res.status(201).send({
                message: 'User Registered',
                data:savedUser
            });
        }
    }
    catch (err){
            console.error(`Error ${err}`);
            return res.status(500).send({
                message: err
            });
   }
});

const server = app.listen(8000, () => {
    var address = server.address().address;
    var port = server.address().port;

    console.log(`Server started at: http://${address}:${port}`);
});