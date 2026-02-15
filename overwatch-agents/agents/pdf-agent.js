const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Generates a PDF report for a given incident.
 * @param {Object} incidentData The incident data received from the hub.
 */
function generateReport(incidentData) {
    const reportsDir = path.join(__dirname, '../reports');

    // Ensure reports directory exists
    if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir);
    }

    const timestamp = Date.now();
    const fileName = `report-${timestamp}.pdf`;
    const filePath = path.join(reportsDir, fileName);

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    // Header: Red and Bold
    doc.fillColor('red')
        .fontSize(25)
        .text('CONFIDENTIAL REPORT', { align: 'center', underline: true });

    doc.moveDown();

    // Content: Incident Details
    doc.fillColor('black')
        .fontSize(12)
        .text(`Generated on: ${new Date().toLocaleString()}`)
        .moveDown();

    doc.fontSize(16)
        .text('--- Incident Details ---', { underline: true })
        .moveDown(0.5);

    doc.fontSize(12)
        .text(`Incident ID: ${incidentData.id || 'N/A'}`)
        .text(`Type: ${incidentData.type || 'N/A'}`)
        .text(`Priority: ${incidentData.priority || 'N/A'}`)
        .text(`Location: ${incidentData.latitude}, ${incidentData.longitude}`)
        .moveDown();

    doc.fontSize(14)
        .text('Description:', { underline: true })
        .moveDown(0.5);

    doc.fontSize(12)
        .text(incidentData.text || 'No description provided.');

    doc.moveDown(2);
    doc.fontSize(10)
        .text('Overwatch AI System - Agent Hub', { align: 'center', oblique: true });

    doc.end();

    console.log(`[pdf-agent] Report generated: ${filePath}`);

    return filePath;
}

module.exports = { generateReport };
