import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';
import { format } from 'date-fns';
import { PrismaClient, Settings } from 'prisma/prisma-client';

export async function createReceipt(order: any) {
  const COMPANY_NAME = process.env.COMPANY_NAME || '';
  const COMPANY_STREET = process.env.COMPANY_STREET || '';
  const COMPANY_ORG_NUMBER = process.env.COMPANY_ORG_NUMBER || '';
  const ORDER_CHECK_ORDER =
    `${process.env.BASE_URL}/order/${order.refId}` || '';

  const qrImage = await QRCode.toDataURL(ORDER_CHECK_ORDER, {
    errorCorrectionLevel: 'H',
  });
  const prisma = new PrismaClient();
  const settings = await prisma.settings.findFirst();
  prisma.$disconnect();

  const imageUrl = order.truckType.image;
  /* const truckTypeImageResponse = await axios({
    method: 'get',
    url: imageUrl,
    responseType: 'arraybuffer',
  });
*/
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldTimesRomanFont = await pdfDoc.embedFont(
    StandardFonts.HelveticaBold
  );
  const page = pdfDoc.addPage();

  // Convert the QR and truck images for PDF embedding
  const qrImageEmbedded = await pdfDoc.embedPng(qrImage);
  /* const truckImage = await pdfDoc.embedJpg(
    new Uint8Array(truckTypeImageResponse.data)
  );
*/
  // Add logo
  const logoPath = './files/logo.png';
  const pickupIconPath = './files/pickup.png';
  const deliveryIconPath = './files/dropoff.png';
  const pickupStopIconPath = './files/pickupPoint.png';
  const deliveryStopIconPath = './files/dropoffPoint.png';
  const withDriverHelpIconPath = './files/driverP.png';
  const withoutDriverHelpIconPath = './files/driverN.png';
  const logoImageBytes = fs.readFileSync(logoPath);
  const pickupIconBytes = fs.readFileSync(pickupIconPath);
  const deliveryIconBytes = fs.readFileSync(deliveryIconPath);
  const pickupStopIconBytes = fs.readFileSync(pickupStopIconPath);
  const deliveryStopIconBytes = fs.readFileSync(deliveryStopIconPath);
  const withDriverHelpIconBytes = fs.readFileSync(withDriverHelpIconPath);
  const withoutDriverHelpIconBytes = fs.readFileSync(withoutDriverHelpIconPath);
  const logoImage = await pdfDoc.embedPng(logoImageBytes);
  const pickupIcon = await pdfDoc.embedPng(pickupIconBytes);
  const deliveryIcon = await pdfDoc.embedPng(deliveryIconBytes);
  const pickupStopIcon = await pdfDoc.embedPng(pickupStopIconBytes);
  const deliveryStopIcon = await pdfDoc.embedPng(deliveryStopIconBytes);
  const withDriverHelpIcon = await pdfDoc.embedPng(withDriverHelpIconBytes);
  const withoutDriverHelpIcon = await pdfDoc.embedPng(
    withoutDriverHelpIconBytes
  );

  const { width, height } = page.getSize();

  // Add the company logo
  page.drawImage(logoImage, {
    x: 30,
    y: height - 55,
    width: 150,
    height: 35,
  });

  // Add company details
  page.drawText(COMPANY_NAME, {
    x: 440,
    y: height - 55,
    size: 12,
    font: boldTimesRomanFont,
  });
  page.drawText(COMPANY_STREET, {
    x: 440,
    y: height - 70,
    size: 10,
    font: timesRomanFont,
  });
  page.drawText(`Org number: ${COMPANY_ORG_NUMBER}`, {
    x: 440,
    y: height - 85,
    size: 10,
    font: timesRomanFont,
  });

  page.drawText('Booking Date:', {
    x: 440,
    y: height - 100,
    size: 10,
    font: timesRomanFont,
  });
  page.drawText(format(new Date(order?.createdAt), 'yyyy-MM-dd'), {
    x: 505,
    y: height - 100,
    size: 10,
    font: timesRomanFont,
  });
  page.drawText(`Ref Id: ${order?.refId}`, {
    x: 440,
    y: height - 120,
    size: 12,
    font: boldTimesRomanFont,
  });

  // Add QR code
  page.drawImage(qrImageEmbedded, {
    x: width / 2 - 25,
    y: height - 130,
    width: 50,
    height: 50,
  });

  // User Info
  page.drawText(`Name: ${order?.payment?.name}`, {
    x: 40,
    y: height - 80,
    size: 10,
    font: timesRomanFont,
  });
  page.drawText(`Email: ${order?.payment?.email}`, {
    x: 40,
    y: height - 95,
    size: 10,
    font: timesRomanFont,
  });
  page.drawText(`Phone: ${order?.payment?.phone}`, {
    x: 40,
    y: height - 110,
    size: 10,
    font: timesRomanFont,
  });
  page.drawText(`Address: ${order?.payment?.address}`, {
    x: 40,
    y: height - 125,
    size: 10,
    font: timesRomanFont,
  });
  page.drawText(
    `City/Postal: ${order?.payment?.city} ${order?.payment?.postal}`,
    {
      x: 40,
      y: height - 140,
      size: 10,
      font: timesRomanFont,
    }
  );

  // Billing info

  // duration and distance
  page.drawText(`Duration: ${order?.duration} Minutes`, {
    x: 440,
    y: height - 160,
    size: 10,
    font: timesRomanFont,
  });
  page.drawText(`Distance: ${order?.distance} KM`, {
    x: 440,
    y: height - 175,
    size: 10,
    font: timesRomanFont,
  });

  // collection
  page.drawImage(pickupIcon, {
    x: 30,
    y: height - 180,
    width: 30,
    height: 30,
  });

  page.drawText(
    `${order?.collection?.address} | ${order?.collection?.postal}`,
    {
      x: 60,
      y: height - 170,
      size: 14,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    }
  );

  page.drawText(`${order?.collection?.name} | ${order?.collection?.phone}`, {
    x: 60,
    y: height - 185,
    size: 10,
    font: timesRomanFont,
  });
  if (order?.collection?.additional && order?.collection?.additional !== null) {
    page.drawText(`${order?.collection?.additional}`, {
      x: 60,
      y: height - 200,
      size: 10,
      font: timesRomanFont,
    });
  }

  // Dynamic content for stops
  let currentHeight = height - 220;
  order?.stopPoints?.forEach((stop: any, index: number) => {
    page.drawImage(
      stop?.type === 'pickup' ? pickupStopIcon : deliveryStopIcon,
      {
        x: 50,
        y: currentHeight - 10,
        width: 20,
        height: 20,
      }
    );
    page.drawText(`${index + 1}`, {
      x: 58.5,
      y: currentHeight + 1,
      size: 6,
      font: timesRomanFont,
    });
    page.drawText(`${stop?.address}`, {
      x: 75,
      y: currentHeight - 2,
      size: 10,
      font: timesRomanFont,
    });
    if (
      stop?.phone !== '' &&
      stop?.phone !== null &&
      stop?.phone !== undefined
    ) {
      page.drawText(`${stop?.phone}`, {
        x: 75,
        y: currentHeight - 10,
        size: 10,
        font: timesRomanFont,
      });
    }
    currentHeight -= 40;
  });
  // delivery
  page.drawImage(deliveryIcon, {
    x: 30,
    y: currentHeight - 30,
    width: 30,
    height: 30,
  });
  page.drawText(`${order?.delivery?.address} | ${order?.delivery?.postal}`, {
    x: 60,
    y: currentHeight - 20,
    size: 14,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(`${order?.delivery?.name} | ${order?.delivery?.phone}`, {
    x: 60,
    y: currentHeight - 35,
    size: 10,
    font: timesRomanFont,
  });

  // draw line between collection and delivery
  page.drawLine({
    start: { x: 45, y: height - 180 },
    end: { x: 45, y: currentHeight },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  // Truck Details
  /*  page.drawImage(truckImage, {
    x: 20,
    y: currentHeight - 200,
    width: 200,
    height: 100,
  });*/
  page.drawLine({
    start: { x: 30, y: currentHeight - 75 },
    end: { x: 550, y: currentHeight - 75 },
    thickness: 1,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawRectangle({
    x: 30,
    y: currentHeight - 80,
    width: 520,
    height: 30,
    color: rgb(0.9, 0.9, 0.9), // optional border color
  });
  page.drawText('Vehicle Details', {
    x: 40,
    y: currentHeight - 70,
    size: 12,
    font: boldTimesRomanFont,
  });

  page.drawText(`${order?.truckType?.name}`, {
    x: 40,
    y: currentHeight - 105,
    size: 14,
    font: timesRomanFont,
  });
  page.drawText(`Length: ${order?.truckType?.length}M`, {
    x: 40,
    y: currentHeight - 122,
    size: 10,
    font: timesRomanFont,
  });
  page.drawText(`Width: ${order?.truckType?.width}M`, {
    x: 130,
    y: currentHeight - 122,
    size: 10,
    font: timesRomanFont,
  });
  page.drawText(`Height: ${order?.truckType?.height}M`, {
    x: 40,
    y: currentHeight - 140,
    size: 10,
    font: timesRomanFont,
  });
  page.drawText(`Max Weight: ${order?.truckType?.maxWeight}KG`, {
    x: 130,
    y: currentHeight - 140,
    size: 10,
    font: timesRomanFont,
  });

  // add wih driver help:

  page.drawText(`With Driver Help: ${order?.withDriverHelp ? 'Yes' : 'No'}`, {
    x: 400,
    y: currentHeight - 105,
    size: 14,
    font: timesRomanFont,
  });
  page.drawImage(
    order?.withDriverHelp ? withDriverHelpIcon : withoutDriverHelpIcon,
    {
      x: 400,
      y: currentHeight - 145,
      width: 30,
      height: 30,
    }
  );
  // add line  at the end

  page.drawRectangle({
    x: 30,
    y: currentHeight - 190,
    width: 520,
    height: 30,
    color: rgb(0.9, 0.9, 0.9), // optional border color
  });
  page.drawText('Fare BreakDown', {
    x: 40,
    y: currentHeight - 180,
    size: 12,
    font: boldTimesRomanFont,
  });

  page.drawText(`Base Fare`, {
    x: 40,
    y: currentHeight - 205,
    size: 11,
    font: timesRomanFont,
  });

  page.drawText(
    `${order?.truckType?.initialPrice} ${settings?.currencySymbol}`,
    {
      x: 400,
      y: currentHeight - 205,
      size: 11,
      font: timesRomanFont,
    }
  );

  page.drawText(`Per Minute`, {
    x: 40,
    y: currentHeight - 225,
    size: 11,
    font: timesRomanFont,
  });

  page.drawText(
    `${order?.truckType?.standardPricePerMin}${settings?.currencySymbol} x ${
      order.duration
    }Min = ${order?.truckType?.standardPricePerMin * order.duration}${
      settings?.currencySymbol
    }`,
    {
      x: 400,
      y: currentHeight - 225,
      size: 11,
      font: timesRomanFont,
    }
  );

  if (order?.withDriverHelp) {
    page.drawText(`service Charge(Driver Help) `, {
      x: 40,
      y: currentHeight - 245,
      size: 11,
      font: timesRomanFont,
    });

    page.drawText(`${order?.withDriverHelpCost} ${settings?.currencySymbol}`, {
      x: 400,
      y: currentHeight - 245,
      size: 11,
      font: timesRomanFont,
    });
    currentHeight -= 20;
  }

  if (order?.stopPoints?.length > 0) {
    page.drawText(`Stop Points Fees`, {
      x: 40,
      y: currentHeight - 245,
      size: 11,
      font: timesRomanFont,
    });

    page.drawText(
      `${order?.stopPoints?.length}Stop Point x ${
        order?.truckType?.stopPointCost
      }${settings?.currencySymbol} = ${
        order?.stopPoints?.length * order?.truckType?.stopPointCost
      }${settings?.currencySymbol}`,
      {
        x: 400,
        y: currentHeight - 245,
        size: 11,
        font: timesRomanFont,
      }
    );
    currentHeight -= 20;
  }

  if (order?.additionalTime > 0) {
    page.drawText(`Waiting Charge`, {
      x: 40,
      y: currentHeight - 245,
      size: 11,
      font: timesRomanFont,
    });

    page.drawText(
      `${order?.additionalTime}Hour x ${order.truckType?.additionalTimeCost}${
        settings?.currencySymbol
      } = ${order?.additionalTime * order.truckType?.additionalTimeCost}${
        settings?.currencySymbol
      }`,
      {
        x: 400,
        y: currentHeight - 245,
        size: 11,
        font: timesRomanFont,
      }
    );
    currentHeight -= 20;
  }
  // subtotal
  page.drawText(`Subtotal`, {
    x: 40,
    y: currentHeight - 245,
    size: 11,
    font: boldTimesRomanFont,
  });

  page.drawText(`${order?.subTotal}${settings?.currencySymbol}`, {
    x: 400,
    y: currentHeight - 245,
    size: 11,
    font: boldTimesRomanFont,
  });
  // vat
  page.drawText(`VAT`, {
    x: 40,
    y: currentHeight - 265,
    size: 11,
    font: boldTimesRomanFont,
  });

  page.drawText(`${order?.vat}${settings?.currencySymbol}`, {
    x: 400,
    y: currentHeight - 265,
    size: 11,
    font: boldTimesRomanFont,
  });
  // total

  page.drawText(`Total`, {
    x: 40,
    y: currentHeight - 285,
    size: 11,
    font: boldTimesRomanFont,
  });

  page.drawText(`${order?.price}`, {
    x: 400,
    y: currentHeight - 285,
    size: 11,
    font: boldTimesRomanFont,
  });

  page.drawRectangle({
    x: 30,
    y: currentHeight - 330,
    width: 520,
    height: 30,
    color: rgb(0.9, 0.9, 0.9), // optional border color
  });
  page.drawText('Payment Details', {
    x: 40,
    y: currentHeight - 320,
    size: 12,
    font: boldTimesRomanFont,
  });

  page.drawText(
    `Method: ${
      order.paymentMethod === 'bill' ? 'Bank Transfer' : 'Card payment'
    }`,
    {
      x: 400,
      y: currentHeight - 320,
      size: 12,
      font: boldTimesRomanFont,
    }
  );

  page.drawText(`Bank Name`, {
    x: 40,
    y: currentHeight - 345,
    size: 12,
    font: boldTimesRomanFont,
  });

  page.drawText(`${process.env.BANK_NAME}`, {
    x: 200,
    y: currentHeight - 345,
    size: 12,
    font: boldTimesRomanFont,
  });

  page.drawText(`Account Name`, {
    x: 40,
    y: currentHeight - 365,
    size: 12,
    font: boldTimesRomanFont,
  });

  page.drawText(`${process.env.ACCOUNT_NAME}`, {
    x: 200,
    y: currentHeight - 365,
    size: 12,
    font: boldTimesRomanFont,
  });

  page.drawText(`Sort Code`, {
    x: 40,
    y: currentHeight - 385,
    size: 12,
    font: boldTimesRomanFont,
  });

  page.drawText(`${process.env.BANK_SORT_CODE}`, {
    x: 200,
    y: currentHeight - 385,
    size: 12,
    font: boldTimesRomanFont,
  });

  page.drawText(`Account Number`, {
    x: 40,
    y: currentHeight - 405,
    size: 12,
    font: boldTimesRomanFont,
  });

  page.drawText(`${process.env.BANK_ACCOUNT_NUMBER}`, {
    x: 200,
    y: currentHeight - 405,
    size: 12,
    font: boldTimesRomanFont,
  });

  page.drawText(`Amount`, {
    x: 40,
    y: currentHeight - 425,
    size: 12,
    font: boldTimesRomanFont,
  });

  page.drawText(`${order?.price}`, {
    x: 200,
    y: currentHeight - 425,
    size: 12,
    font: boldTimesRomanFont,
  });

  page.drawText(`Reference`, {
    x: 40,
    y: currentHeight - 445,
    size: 12,
    font: boldTimesRomanFont,
  });

  page.drawText(`${order?.refId}`, {
    x: 200,
    y: currentHeight - 445,
    size: 12,
    font: boldTimesRomanFont,
  });

  page.drawText(
    `It is important to add order reference in your bank transfer`,
    {
      x: 300,
      y: currentHeight - 445,
      size: 10,
      font: boldTimesRomanFont,
    }
  );

  if (order?.paymentStatus === 'paid') {
    page.drawRectangle({
      x: 400,
      y: currentHeight - 345,
      width: 100,
      height: 30,
      color: rgb(0.9, 0.9, 0.9),
      borderColor: rgb(1, 0, 0),
      borderWidth: 2,
    });

    page.drawText(`Paid`, {
      x: 475,
      y: currentHeight - 335,
      size: 12,
      font: boldTimesRomanFont,
      color: rgb(1, 0, 0),
    });
  }
  // footer
  // DRAW LINE
  page.drawLine({
    start: { x: 30, y: currentHeight - 465 },
    end: { x: 570, y: currentHeight - 465 },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });

  page.drawText(`${process.env.HOME_PAGE}`, {
    x: 40,
    y: currentHeight - 485,
    size: 10,
    font: timesRomanFont,
  });
  page.drawText(`Email: ${process.env.COMPANY_EMAIL}`, {
    x: 200,
    y: currentHeight - 485,
    size: 10,
    font: timesRomanFont,
  });

  page.drawText(`Phone: ${process.env.COMPANY_PHONE}`, {
    x: 440,
    y: currentHeight - 485,
    size: 10,
    font: timesRomanFont,
  });

  page.drawText(
    'Thank you for choosing us. We hope you have a great experience!',
    {
      x: 40,
      y: currentHeight - 495,
      size: 10,
      font: timesRomanFont,
    }
  );

  // Save the PDF to a file
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(`./files/order${order.id}.pdf`, pdfBytes);

  return `./files/order${order.id}.pdf`;
}
