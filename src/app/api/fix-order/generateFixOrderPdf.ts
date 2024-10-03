import PDFDocument from 'pdfkit';
import fs from 'fs';

interface Fix {
  id: string;
  name: string;
  price: number;
  repairingTimeMinutes: number;
}

interface FixOrder {
  id: string;
  imei?: string;
  image?: string;
  problems: string[];
  repairs: Fix[];
  fixes: Fix[];
  userNote?: string;
  maintenanceNote?: string;
  status: string;
  timeToFixMinutes: number;
  price: number;
  vat: number;
  discount: number;
  totalPrice: number;
  doneAt?: string;
  receivedAt?: string;
  expectedDateToFix?: string;
  reference: number;
}

function generateReceiptWithTerms(fixOrder: FixOrder): void {
  const doc = new PDFDocument();
  const fileName = `FixOrder_Receipt_${fixOrder.id}.pdf`;

  // Write the PDF to a file
  doc.pipe(fs.createWriteStream(fileName));

  // Title and Order Information
  doc.fontSize(18).text('FixOrder Receipt', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Order ID: ${fixOrder.id}`);
  doc.text(`Reference: ${fixOrder.reference}`);
  doc.text(`Status: ${fixOrder.status}`);
  doc.text(`IMEI: ${fixOrder.imei || 'N/A'}`);
  doc.text(`User Note: ${fixOrder.userNote || 'N/A'}`);
  doc.text(`Maintenance Note: ${fixOrder.maintenanceNote || 'N/A'}`);
  doc.text(`Received At: ${fixOrder.receivedAt || 'N/A'}`);
  doc.text(`Done At: ${fixOrder.doneAt || 'N/A'}`);
  doc.text(`Expected Date To Fix: ${fixOrder.expectedDateToFix || 'N/A'}`);
  doc.moveDown();

  // Problems
  doc.fontSize(14).text('Problems:', { underline: true });
  fixOrder.problems.forEach((problem, index) => {
    doc.fontSize(12).text(`${index + 1}. ${problem}`);
  });
  doc.moveDown();

  // Repairs
  doc.fontSize(14).text('Repairs:', { underline: true });
  fixOrder.repairs.forEach((repair, index) => {
    doc
      .fontSize(12)
      .text(`${index + 1}. ${repair.name} - $${repair.price.toFixed(2)}`);
  });
  doc.moveDown();

  // Fixes
  doc.fontSize(14).text('Fixes:', { underline: true });
  fixOrder.fixes.forEach((fix, index) => {
    doc
      .fontSize(12)
      .text(
        `${index + 1}. ${fix.name} - $${fix.price.toFixed(2)} (Time: ${
          fix.repairingTimeMinutes
        } minutes)`
      );
  });
  doc.moveDown();

  // Price Breakdown
  doc.fontSize(14).text('Price Breakdown:', { underline: true });
  doc.fontSize(12).text(`Price: $${fixOrder.price.toFixed(2)}`);
  doc.text(`VAT: $${fixOrder.vat.toFixed(2)}`);
  doc.text(`Discount: $${fixOrder.discount.toFixed(2)}`);
  doc.text(`Total Price: $${fixOrder.totalPrice.toFixed(2)}`);
  doc.moveDown();

  // Terms and Conditions
  doc.fontSize(14).text('Terms and Conditions', { underline: true });
  doc
    .fontSize(10)
    .text(
      '1. The company is not responsible for any data loss that may occur during the repair process.'
    );
  doc.text(
    '2. The warranty period for repairs is 90 days from the date of completion.'
  );
  doc.text(
    '3. Any additional damages found during the repair will be communicated before proceeding.'
  );
  doc.text(
    '4. All repairs must be paid in full before the device is returned to the client.'
  );
  doc.text(
    '5. The estimated repair time is subject to change based on the complexity of the issue.'
  );
  doc.moveDown();

  // Client Signature Area
  doc.fontSize(14).text('Client Signature:', { underline: true });
  doc.moveDown();
  doc.fontSize(12).text('_____________________________');
  doc.text('Signature');
  doc.moveDown();
  doc.fontSize(12).text('_____________________________');
  doc.text('Date');

  // Footer
  doc.fontSize(10).text('Thank you for your business!', { align: 'center' });

  // Finalize the PDF
  doc.end();

  console.log(`Receipt with terms and signature area generated: ${fileName}`);
}

export default generateReceiptWithTerms;
