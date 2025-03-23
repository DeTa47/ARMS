

exports.generateCV = async (req, res)=>{

    try{
        const userId = req.body.userId;
        const outputPath = req.body.outputPath;
        cvgen.generateConsultancyPDF(userId, outputPath);
        res.status(200).send('CV Generated!');
    }
    catch(error){
        console.error(error);
    }
}