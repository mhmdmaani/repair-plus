import axios from 'axios';
import { EmailService } from '../utils/email.service';
import { clientContact } from './templates/emailTemplates';

export class SendEmailService {
  static async sendEmail(data: any) {
    const { name, email, message, token } = data;
    // send email
    console.log('Sending email');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    console.log('Token:', token);

    /*
    const response = await this.verifyRecaptcha(token);
    console.log('Recaptcha response:', response);
    if (!response) {
      throw new Error('Recaptcha verification failed');
    }
      */

    const sent = await EmailService.sendEmail({
      to: 'info@repairplus.se',
      subject: 'Contact Form',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
      attachments: [],
    })
      .then(() => {
        console.log('Email sent');
        return {
          success: true,
          message: 'Email sent',
        };
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
      });

    const sentToClient = await EmailService.sendEmail({
      to: email,
      subject: 'Repair Plus Kontakt',
      text: `Tack för att du kontaktar oss. Vi återkommer snart.`,
      html: clientContact(name),
      attachments: [],
    });

    return sent;
  }

  static async verifyRecaptcha(token: string) {
    const secretKey = process.env.RECAPTHA_SECRET_KEY || '';
    const bodyRequest = {
      event: {
        token: token,
        expectedAction: 'USER_ACTION',
        siteKey: '6Ldd9SoqAAAAAJ6bCnW9tQOa4zJZqiEUCr4aID-F',
      },
    };
    const verificationUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/national-quick-1715204072654/assessments?key=${secretKey}`;
    const result = await axios.post(verificationUrl, bodyRequest);
    console.log('Recaptcha result:', result.data);
    if (
      !result.data ||
      !result.data.riskAnalysis ||
      result.data.riskAnalysis.score < 0.5
    ) {
      return false;
    }
    return true;
  }
}
