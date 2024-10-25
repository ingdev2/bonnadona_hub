import { Injectable } from '@nestjs/common';
import { SendEmailDto } from '../dto/send_email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import {
  DEFAULT_EMAIL_FROM,
  NAME_EMAIL_FROM,
} from '../constants/email_config.constant';
import { join } from 'path';

@Injectable()
export class NodemailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(email: SendEmailDto) {
    const {
      from,
      recipients,
      subject,
      emailTemplate,
      userNameToEmail,
      userIdNumberToEmail,
      bonnaHubUrl,
      supportContactEmail,
      verificationCode,
      resetPasswordUrl,
    } = email;

    const emailSent = await this.mailerService.sendMail({
      from: from ?? {
        name: NAME_EMAIL_FROM,
        address: DEFAULT_EMAIL_FROM,
      },
      to: recipients,
      subject: subject,
      template: emailTemplate,
      context: {
        userNameToEmail,
        userIdNumberToEmail,
        bonnaHubUrl,
        supportContactEmail,
        verificationCode,
        resetPasswordUrl,
      },
      attachments: [
        {
          filename: 'logo_horizontal.png',
          path: join(__dirname, '../../../assets/logos/logo_horizontal.png'),
          cid: 'logo_bonna_hub@bonnadona.co',
        },
        {
          filename: 'LOGO-BONNADONA.png',
          path: join(__dirname, '../../../assets/logos/LOGO-BONNADONA.png'),
          cid: 'logo_bonnadona@bonnadona.co',
        },
      ],
    });

    try {
      const response = await this.mailerService.sendMail(emailSent);

      return response;
    } catch (error) {
      console.log('Error al enviar correo: ', error);
    }
  }
}
