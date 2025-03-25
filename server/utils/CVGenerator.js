const fs = require("fs");
const PDFDocument = require("./PDFKitTables.js");
// Load the patients 
//const patients = require("./patients.json");
function CVGenerator(data, outputDir){


        const keys = Object.keys(data);

        const doc = new PDFDocument();
        const imgBuffer = fs.readFileSync('c:/Users/devan/OneDrive/Documents/ARMS/server/assets/Msu_baroda_logo.png');      
    
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        doc.pipe(fs.createWriteStream(`${outputDir}/cv.pdf`));

        // Add the header - https://pspdfkit.com/blog/2019/generate-invoices-pdfkit-node/
        doc.fillColor("navy blue").text("Devansh Tataria").fontSize(12).font("Times-Roman")
            .image(imgBuffer, 450, 45, {height:70, width: 70}).moveDown()
            .moveDown()
            .rect(50, doc.y+10, 500, 1).fill("navy blue").moveDown()
            .text("Faculty: Faculty of Technology of Engineering",50,doc.y+10).fontSize(12)
            .text("Department: Department of Computer Science & Engineering", 300, doc.y-20).fontSize(12).moveDown()
            .text("Phone no.: 9586266142", 50, doc.y).fontSize(12)
            .text("Designation: Professor(Direct Recruitment)", 300, doc.y).fontSize(12).moveDown()
            .text("Email: devansh.tataria111@gmail.com", 50, doc.y).moveDown()
            .rect(50, doc.y+10, 500, 1).fill("navy blue").moveDown();

        // Create the table - https://www.andronio.me/2017/09/02/pdfkit-tables/
        
        for (const key of keys) {

            const table = {
                headers: Object.keys(data[key][0]),
                rows: data[key].map(item => Object.values(item))
            };
            
            console.log(table);

            doc.text(key,50, doc.y+20).moveDown().rect(50, doc.y+10, 500, 1).table(table, 50, doc.y, { width: 150 });
        }

        // Finalize the PDF and end the stream
        doc.end();
}

module.exports = {CVGenerator};