const PDFDocument = require('pdfkit');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

async function generateConsultancyPDF(userId, outputPath) {
    try {
        outputPath = outputPath || path.join(__dirname, '../output/cv.pdf');
        userId = userId || "67bdceaa38f7237556547487";

        
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

       
        const response = await axios.post('http://localhost:8000/getconsultancy-details', { userId });
        const consultancyDetails = response.data;

        if (!consultancyDetails.length) {
            console.log('No consultancy details found.');
            return;
        }

        
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(outputPath));

       
        doc.fontSize(18).text('Consultancy Details', { align: 'center' });
        doc.moveDown();

        
        const keys = Object.keys(consultancyDetails[0]);
        keys.forEach((key, index) => {
            doc.fontSize(12).text(key.charAt(0).toUpperCase() + key.slice(1), 50 + index * 150, doc.y, { continued: index < keys.length - 1 });
        });
        doc.moveDown();

        
        consultancyDetails.forEach((detail) => {
            keys.forEach((key, index) => {
                doc.text(detail[key], 50 + index * 150, doc.y, { continued: index < keys.length - 1 });
            });
            doc.moveDown();
        });

        // Finalize the PDF
        doc.end();
        console.log(`PDF generated at: ${outputPath}`);
    } catch (error) {
        console.error('Error generating PDF:', error.message);
    }
}

module.exports = { generateConsultancyPDF };
