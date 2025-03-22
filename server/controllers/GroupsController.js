const GroupDetails = require('../schema/Groups');

exports.getGroups = async (req, res)=>{
    try{
        const groups = await GroupDetails.find();
        res.status(200).json(groups);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Error fetching groups'});
    }
}