import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import QRCode from 'qrcode';
import path from 'path';
import { format } from 'date-fns';
import { PrismaClient } from 'prisma/prisma-client';

async function generateReceiptWithTerms(fixOrder: any): Promise<void> {
  const pdfDoc = await PDFDocument.create();
  const prisma = new PrismaClient();
  const settings = await prisma.settings.findFirst();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 12;

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const margin = 50;

  let yPosition = height - 50;

  // Company Logo at the Top
  const logoPath = path.join(process.cwd(), 'public/files/logo.png');
  const logoImageBytes = fs.readFileSync(logoPath);
  const logoImage = await pdfDoc.embedPng(logoImageBytes);
  const logoWidth = 100;
  const logoHeight = 50;

  page.drawImage(logoImage, {
    x: margin,
    y: yPosition - logoHeight,
    width: logoWidth,
    height: logoHeight,
  });

  yPosition -= 60; // Adjust y position below the logo

  // Header Section with Invoice Details
  page.drawText('Invoice', {
    x: width / 2 - 30,
    y: yPosition,
    size: 20,
    font,
    color: rgb(0, 0, 0),
  });
  yPosition -= 40;

  page.drawText(
    `Invoice Date: ${format(fixOrder.createdAt, 'yyyy-MM-dd hh:mm')}`,
    {
      x: margin,
      y: yPosition,
      size: fontSize,
      font,
    }
  );
  yPosition -= 20;

  // Customer Info Box
  page.drawText('Customer Info', {
    x: margin,
    y: yPosition,
    size: 14,
    font,
    color: rgb(0, 0, 0),
  });
  page.drawText(`Name: ${fixOrder.user.name}`, {
    x: margin,
    y: (yPosition -= 20),
    size: fontSize,
    font,
  });
  page.drawText(`Email: ${fixOrder.user.email}`, {
    x: margin,
    y: (yPosition -= 20),
    size: fontSize,
    font,
  });
  page.drawText(`Tel: ${fixOrder.user.tel}`, {
    x: margin,
    y: (yPosition -= 20),
    size: fontSize,
    font,
  });
  page.drawText(`Address: ${fixOrder.user.address}`, {
    x: margin,
    y: (yPosition -= 20),
    size: fontSize,
    font,
  });

  // Company Info Box (on the right)
  let rightX = width - margin - 150;
  yPosition = height - 150;

  page.drawText(`${settings?.companyName}`, {
    x: rightX,
    y: (yPosition -= 20),
    size: fontSize,
    font,
  });
  page.drawText(`Email: ${settings?.contactEmail}`, {
    x: rightX,
    y: (yPosition -= 20),
    size: fontSize,
    font,
  });
  page.drawText(`Tel: ${settings?.contactPhone}`, {
    x: rightX,
    y: (yPosition -= 20),
    size: fontSize,
    font,
  });
  page.drawText(`${settings?.address}`, {
    x: rightX,
    y: (yPosition -= 20),
    size: 10,
    font,
  });

  // Move down for table section
  yPosition -= 50;

  // Table Headers
  page.drawText('Item', {
    x: margin,
    y: yPosition,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });
  page.drawText('Price', {
    x: rightX,
    y: yPosition,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });
  yPosition -= 20;

  // Table Content: Combining Fixes and Repairs
  const allRepairsAndFixes = [
    ...fixOrder.repairs.map((c: any) => ({
      name: c.name,
      price: c.sellPrice,
    })),
    ...fixOrder.fixes,
  ];
  allRepairsAndFixes.forEach((item: any) => {
    page.drawText(item.name, { x: margin, y: yPosition, size: fontSize, font });
    page.drawText(`${settings?.currencySymbol} ${item.price.toFixed(2)}`, {
      x: rightX,
      y: yPosition,
      size: fontSize,
      font,
    });
    yPosition -= 20;
  });

  // Move down for Terms and Conditions
  yPosition -= 30;
  page.drawText('Terms and Conditions', {
    x: margin,
    y: yPosition,
    size: 14,
    font,
  });
  const terms = [
    '1. The company is not responsible for any data loss that may occur during the repair process.',
    '2. The warranty period for repairs is 90 days from the date of completion.',
    '3. Any additional damages found during the repair will be communicated before proceeding.',
    '4. All repairs must be paid in full before the device is returned to the client.',
    '5. The estimated repair time is subject to change based on the complexity of the issue.',
  ];
  terms.forEach((term) => {
    yPosition -= 15;
    page.drawText(term, { x: margin, y: yPosition, size: fontSize - 2, font });
  });

  // Move down for Signature Area
  yPosition -= 50;
  page.drawText('Client Signature:', {
    x: margin,
    y: yPosition,
    size: 14,
    font,
  });
  yPosition -= 20;
  page.drawText('_____________________________', {
    x: margin,
    y: yPosition,
    size: fontSize,
    font,
  });
  yPosition -= 20;
  page.drawText('Signature', { x: margin, y: yPosition, size: fontSize, font });
  yPosition -= 20;
  page.drawText('_____________________________', {
    x: margin,
    y: yPosition,
    size: fontSize,
    font,
  });
  yPosition -= 20;
  page.drawText('Date', { x: margin, y: yPosition, size: fontSize, font });

  // QR Code for Order Status
  const orderLink = `https://repairplus.se/order/${fixOrder.id}/status`;
  const qrCodeImage = await QRCode.toDataURL(orderLink);

  const qrCodeImageBytes = await fetch(qrCodeImage).then((res) =>
    res.arrayBuffer()
  );
  const qrCodeImageEmbed = await pdfDoc.embedPng(qrCodeImageBytes);

  page.drawImage(qrCodeImageEmbed, {
    x: width - margin - 100,
    y: 50,
    width: 100,
    height: 100,
  });

  // Footer with Company Information
  const footerY = 30;
  page.drawText(`Company Address: ${settings?.address}`, {
    x: margin,
    y: footerY,
    size: fontSize - 2,
    font,
  });
  page.drawText(`Website: repairplus.se`, {
    x: margin,
    y: footerY - 15,
    size: fontSize - 2,
    font,
  });
  page.drawText(`Company Register No: ${settings?.registerNumber}`, {
    x: margin,
    y: footerY - 30,
    size: fontSize - 2,
    font,
  });

  // Save PDF
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(`FixOrder_Receipt_${fixOrder.id}.pdf`, pdfBytes);

  console.log(
    `Receipt with logo, footer, terms, signature area, and QR code generated: FixOrder_Receipt_${fixOrder.id}.pdf`
  );
}

export default generateReceiptWithTerms;
