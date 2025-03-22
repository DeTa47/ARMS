require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require ('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const loginSignUpRoutes = require('./routes/loginSignupLogutRoutes');
const emailVerificationRoutes = require('./routes/emailVerificationRoutes');

const groupRoutes = require('./routes/groupRoutes');

//db routes
const researchRoutes = require('./routes/researchRoutes');
const academicProgramRoutes = require('./routes/academicProgramRoutes');
const awardsAndPerformaceRoutes = require('./routes/awardsAndPerformanceRoutes');
const booksAndPapersRoutes = require('./routes/booksAndPapersRoutes');
const talkRoutes = require('./routes/talksRoutes');
const oeisRoutes = require('./routes/OEISRoutes');

//const verifyJWT = require('./middleware/verifyToken');
//const cvgen = require('./utils/CVGenerator');


mongoose.connect(process.env.DB_URI).then(console.log('DB connected')).catch((err)=>console.error(err));

let corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
}
//app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());

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


app.use('/', loginSignUpRoutes);
app.use('/',emailVerificationRoutes);
app.use('/',groupRoutes);
app.use('/', researchRoutes);
app.use('/',academicProgramRoutes);
app.use('/',awardsAndPerformaceRoutes);
app.use('/',booksAndPapersRoutes);
app.use('/',talkRoutes);
app.use('/',oeisRoutes);

const server = app.listen(process.env.PORT, () => {

    console.log(`Server started at: http://${server.address().address}${server.address().port}`);
});