// PDF Generation 

// Create a Function to Update PDF Templates:
async function generateCustomPDF(name, date, role) {
        // Load the certificate and LOR templates
        const certificateTemplateBytes = await fetch('favicon/demo.pdf').then((response) => response.arrayBuffer());
        const lorTemplateBytes = await fetch('favicon/demo.pdf').then((response) => response.arrayBuffer());

        // Create PDF Document objects
        const certificateDoc = await PDFLib.PDFDocument.load(certificateTemplateBytes);
        const lorDoc = await PDFLib.PDFDocument.load(lorTemplateBytes);

        // Update the certificate PDF
        const certificatePage = certificateDoc.getPages()[0];
        certificatePage.drawText(name, { x: 100, y: 200 });
        certificatePage.drawText(date, { x: 100, y: 180 });

        // Update the LOR PDF
        const lorPage = lorDoc.getPages()[0];
        lorPage.drawText(name, { x: 100, y: 300 });
        lorPage.drawText(role, { x: 100, y: 280 });

        // Create new PDFs
        const updatedCertificateBytes = await certificateDoc.save();
        const updatedLORBytes = await lorDoc.save();

        return { updatedCertificateBytes, updatedLORBytes };
}
document.getElementById('get-doc-btn').addEventListener('click', async () => {
        const name = document.getElementById('name').value;
        const date = document.getElementById('cdate').value;
        const role = document.getElementById('role').value;

        const { updatedCertificateBytes, updatedLORBytes } = await generateCustomPDF(name, date, role);

        // Rest of the code for displaying/download links remains the same.
});


// Use the Function with User Data:
document.getElementById('get-doc-btn').addEventListener('click', async () => {
        const name = document.getElementById('name').value;
        const date = document.getElementById('cdate').value;
        const role = document.getElementById('role').value;

        const { updatedCertificateBytes, updatedLORBytes } = await generateCustomPDF(name, date, role);

        // Save or display the customized PDFs
        const certificateBlob = new Blob([updatedCertificateBytes], { type: 'application/pdf' });
        const lorBlob = new Blob([updatedLORBytes], { type: 'application/pdf' });

        const certificateURL = URL.createObjectURL(certificateBlob);
        const lorURL = URL.createObjectURL(lorBlob);

        // Create links for downloading the PDFs
        const certificateDownloadLink = document.createElement('a');
        certificateDownloadLink.href = certificateURL;
        certificateDownloadLink.download = 'custom_certificate.pdf';
        certificateDownloadLink.textContent = 'Download Custom Certificate';
        document.body.appendChild(certificateDownloadLink);

        const lorDownloadLink = document.createElement('a');
        lorDownloadLink.href = lorURL;
        lorDownloadLink.download = 'custom_lor.pdf';
        lorDownloadLink.textContent = 'Download Custom LOR';
        document.body.appendChild(lorDownloadLink);

        // Automatically trigger the download of the PDFs
        certificateDownloadLink.click();
        lorDownloadLink.click();
});
