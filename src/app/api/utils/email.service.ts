import nodemailer from 'nodemailer';

export type SendEmailInput = {
  to: string;
  subject: string;
  text: string;
  html: string;
  attachments: any[];
};

export class EmailService {
  static async sendEmail({
    to,
    subject,
    text,
    html,
    attachments,
  }: SendEmailInput) {
    const transporter = nodemailer.createTransport({
      //@ts-ignore
      host: process.env.EMAIL_SMTP_HOST || '',
      port: process.env.EMAIL_SMTP_HOST_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_SENDER_PASSWORD,
      },
    });

    const mailOptions = {
      from: `Repair Plus <${process.env.EMAIL_SENDER}>` || '',
      to,
      subject,
      text,
      html,
      attachments,
    };

    /*   if (calendarObj) {
      const alternatives = {
        'Content-Type': 'text/calendar',
        method: 'REQUEST',
        content: new Buffer(calendarObj.toString()),
        component: 'VEVENT',
        'Content-Class': 'urn:content-classes:calendarmessage',
      };
      mailOptions['alternatives'] = alternatives;
    }*/

    try {
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (err) {
      console.error('Error sending email:', err);
      return err;
    }
  }

  static sendVerificationCodeTemplate(code: string, name: string) {
    return `<p>Dear ${name},</p><p>Please Verify your order <a href="${process.env.BASE_URL}/verify/order/${code}" >Verify Now</a>`;
  }

  static async successVerificationTemplate(name: string, id: string | number) {
    return `<p>Dear ${name},</p><p>Your order has been verified you can check your order latest news on this <a href="${process.env.BASE_URL}/order/${id}" >Review Order link</a> </p>`;
  }
}
