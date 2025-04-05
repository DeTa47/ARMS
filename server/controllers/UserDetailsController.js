const userDetails = require('../schema/UserDetails');

exports.getUserDetailsById = async (req, res) => {

    const userData = await userDetails.findOne({_id: req.body.userId});
    
    return res.status(200).send(userData);

}

exports.updateUserDetails = async (req, res) => {

       try{
            const data = req.body.data;
            const id = req.body.id;
            const updatedDetails = await userDetails.findByIdAndUpdate(id, data, {new: true});
            res.status(200).send(updatedDetails);
       }

       catch(error){
            res.error(error);
       }
}