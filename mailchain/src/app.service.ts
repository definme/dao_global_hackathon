import { Mailchain } from '@mailchain/sdk';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Mail } from './types';
import { config as envs } from "dotenv";
envs();

type GetVotersResponse = Array<string>;


@Injectable()
export class AppService {
    seed = process.env.MAILCHAIN_SECRET_RECOVERY_PHRASE!;
    mailchain = Mailchain.fromSecretRecoveryPhrase(this.seed);

    async __performMailingList(mail: Mail) {
        const response = await axios.get<GetVotersResponse>("https://api-ether-luxe.definme.com/api/voters");
        const voters = response.data.map((voter) => `${voter}@ethereum.mailchain.com`);
        const from = await this.mailchain.user();
        console.log(`Mailing list: ${voters}`);
        const { error } = await this.mailchain.sendMail({
            from: from.address,
            to: voters,
            content: {
                text: mail.contentPlain,
                html: mail.contentHTML
            },
            subject: mail.subject
        });
        if (error) {
            throw new Error(JSON.stringify(error));
        } else {
            console.log("All messages sent successfully");
        }
    }

    performMailingList(mail: Mail) {
        this.__performMailingList(mail).catch((error) => {
            console.error(error);
        });
    }
}
