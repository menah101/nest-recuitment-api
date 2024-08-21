import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly mailerService: MailerService,
  ) {}

  @Get()
  @Public()
  @ResponseMessage('Test email')
  async handleTestMail() {
    await this.mailerService.sendMail({
      to: 'quy_le_van@bita.jp',
      from: '"Support Team" <support@example.com>',
      subject: 'Welcome to Nice App! Confirm your email',
      html: '<b>welcome bla bla</b>',
    });
  }
}
