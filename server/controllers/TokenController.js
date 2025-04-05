require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserDetails = require('./schema/UserDetails');
const generateToken = require('./utils/generateToken');

const refresh = async (req, res)=>{

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
        console.error(error);
    }
}

module.exports = { refresh };