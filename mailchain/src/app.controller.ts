import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Mail } from './types';
import { Response } from 'express';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Post("/mailing")
    performMailingList(@Body() mail: Mail, @Res() response: Response) {
        let errors = [];
        if (!mail.contentHTML) {
            errors.push("contentHTML");
        }
        if (!mail.contentPlain) {
            errors.push("contentPlain");
        }
        if (!mail.subject) {
            errors.push("subject");
        }
        if (errors.length > 0) {
            response.status(HttpStatus.BAD_REQUEST).json({
                "status": "bad request",
                errors
            });
        } else {
            this.appService.performMailingList(mail);
            response.status(HttpStatus.CREATED).json({
                status: "Initialized mailing"
            });
        }
    }
}
