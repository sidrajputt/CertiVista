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
        // const certificateDownloadLink = document.createElement('a');
        // certificateDownloadLink.href = certificateURL;
        // certificateDownloadLink.download = name + '' + 'Certificate.pdf';
        // certificateDownloadLink.textContent = 'Download Custom Certificate';
        // document.body.appendChild(certificateDownloadLink);
        const certificateDownloadButton = document.createElement('a');
        certificateDownloadButton.href = certificateURL;
        certificateDownloadButton.download = name + '' + 'Certificate.pdf';

        // Apply styles to make it look like a button
        certificateDownloadButton.style.display = 'inline-block'; // Display it as an inline-block element
        certificateDownloadButton.style.padding = '5px 10px'; // Add padding to create a button-like shape
        certificateDownloadButton.style.backgroundColor = '#039be5'; // Background color for the button
        certificateDownloadButton.style.color = 'white'; // Text color
        certificateDownloadButton.style.textDecoration = 'none'; // Remove underline
        certificateDownloadButton.style.border = 'none'; // Remove border
        certificateDownloadButton.style.borderRadius = '5px'; // Add rounded corners
        certificateDownloadButton.style.cursor = 'pointer'; // Change cursor on hover
        certificateDownloadButton.style.marginLeft = '47%'; //
        // You can also add additional styles as needed
        certificateDownloadButton.style.fontWeight = 'bold'; // Make the text bold
        certificateDownloadButton.style.fontSize = '12px'; // Set the font size

        certificateDownloadButton.textContent = 'Download Certificate';
        document.body.appendChild(certificateDownloadButton);


        // const lorDownloadLink = document.createElement('a');
        // lorDownloadLink.href = lorURL;
        // lorDownloadLink.download = name + '' + 'lor.pdf';
        // lorDownloadLink.textContent = 'Download Custom LOR';
        // document.body.appendChild(lorDownloadLink);
        const lorDownloadButton = document.createElement('a');
        lorDownloadButton.href = lorURL;
        lorDownloadButton.download = name + '' + 'lor.pdf';

        // Apply styles to make it look like a button
        lorDownloadButton.style.display = 'inline-block'; // Display it as an inline-block element
        lorDownloadButton.style.padding = '5px 10px'; // Add padding to create a button-like shape
        lorDownloadButton.style.backgroundColor = '#039be5'; // Background color for the button
        lorDownloadButton.style.color = 'white'; // Text color
        lorDownloadButton.style.textDecoration = 'none'; // Remove underline
        lorDownloadButton.style.border = 'none'; // Remove border
        lorDownloadButton.style.borderRadius = '5px'; // Add rounded corners
        lorDownloadButton.style.cursor = 'pointer'; // Change cursor on hover
        lorDownloadButton.style.marginLeft = '4px'; // Margin
        // You can also add additional styles as needed
        lorDownloadButton.style.fontWeight = 'bold'; // Make the text bold
        lorDownloadButton.style.fontSize = '12px'; // Set the font size

        lorDownloadButton.textContent = 'Download LOR';
        document.body.appendChild(lorDownloadButton);


        // Automatically trigger the download of the PDFs
        // certificateDownloadLink.click();
        // lorDownloadLink.click();
});
