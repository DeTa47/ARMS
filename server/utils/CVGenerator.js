const fs = require("fs");
const PDFDocument = require("./PDFKitTables.js");

function CVGenerator(data, outputDir, payload) {
    const keys = Object.keys(data);
    const path = `${outputDir}/cv.pdf`;

    console.log(payload);

    const doc = new PDFDocument();
    const imgBuffer = fs.readFileSync('c:/Users/devan/OneDrive/Documents/ARMS/server/assets/Msu_baroda_logo.png');

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    doc.pipe(fs.createWriteStream(path));

    // Add the header
    doc.fillColor("navy blue").text(`Name: ${payload.name}`).fontSize(12).font("Times-Roman")
        .image(imgBuffer, 450, 45, { height: 70, width: 70 }).moveDown()
        .moveDown()
        .rect(50, doc.y + 10, 500, 1).fill("navy blue").moveDown()
        .text(`Faculty: ${payload.faculty}`, 50, doc.y + 10).fontSize(12)
        .text(`Department: ${payload.department}`, 300, doc.y - 20).fontSize(12).moveDown()
        .text(`Phone no.: ${payload.phone}`, 50, doc.y).fontSize(12)
        .text(`Designation: ${payload.designation}`, 300, doc.y).fontSize(12).moveDown()
        .text(`Email: ${payload.email}`, 50, doc.y).moveDown()
        .rect(50, doc.y + 10, 500, 1).fill("navy blue").moveDown();

    // Create the table
    for (const key of keys) {
        if (!data[key] || data[key].length === 0) {
            doc.text(`${key}: No data available`, 50, doc.y + 20).moveDown();
            continue;
        }

        const table = {
            headers: Object.keys(data[key][0]),
            rows: data[key].map(item => Object.values(item))
        };

        // Ensure table headers and rows are valid
        if (table.headers.length === 0 || table.rows.length === 0) {
            doc.text(`${key}: Invalid data`, 50, doc.y + 20).moveDown();
            continue;
        }

        doc.text(key, 50, doc.y + 20).moveDown().rect(50, doc.y + 10, 500, 1)
            .table(table, 50, doc.y, { width: 500 });
    }

    // Finalize the PDF and end the stream
    doc.end();

    return path;
}

module.exports = { CVGenerator };