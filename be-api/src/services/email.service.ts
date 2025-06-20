import sgMail from '@sendgrid/mail';
import { SendGridSettings } from '../interfaces/SendGridSettings';
import * as dotenv from 'dotenv';
dotenv.config();

export class EmailService {
  private settings: SendGridSettings;

  constructor() {
    this.settings = {
      apiKey: process.env.SENDGRID_API_KEY!,
      senderEmail: process.env.SENDGRID_SENDER_EMAIL!,
      senderName: process.env.SENDGRID_SENDER_NAME!,
      adminEmail: process.env.SENDGRID_ADMIN_EMAIL!,
    };

    sgMail.setApiKey(this.settings.apiKey);
  }

  async sendParticipantNotificationAsync(name: string, message: string): Promise<void> {
    const msg = {
      to: this.settings.adminEmail,
      from: {
        email: this.settings.senderEmail,
        name: this.settings.senderName,
      },
      subject: `🎓 Người tham gia mới: ${name}`,
      text: message || '(Không có nội dung)',
      html: `<p><strong>${name}</strong> đã xác nhận tham gia và để lại lời chúc:</p><p>${message || '(Không có nội dung)'}</p>`,
    };

    // 👉 Ghi log nội dung email ra console
    console.log('📧 Email chuẩn bị gửi:');
    console.log(JSON.stringify(msg, null, 2));

    try {
      await sgMail.send(msg);
      console.log('✅ Email participant notification đã gửi thành công');
    } catch (error: any) {
      console.error('❌ Lỗi gửi email:', error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  }
}
