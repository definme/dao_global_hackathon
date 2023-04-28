import {Mailchain} from "@mailchain/sdk";
import {config as envs} from "dotenv";
import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
envs();
type GetVotersResponse = Array<string>;
type Mail = {
    subject: string,
    contentPlain: string,
    contentHTML: string,
}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


const mailing = async (mail: Mail) => {
    const seed = process.env.MAILCHAIN_SECRET_RECOVERY_PHRASE!;
    const mailchain = Mailchain.fromSecretRecoveryPhrase(seed);
    const response = await axios.get<GetVotersResponse>("https://api-ether-luxe.definme.com/api/voters");
    const voters = response.data.map((voter) => `${voter}@ethereum.mailchain.com`);
    const from = await mailchain.user();
    console.log(voters);
    const {error} = await mailchain.sendMail({
        from: from.address,
        to: voters,
        content: {
            text: mail.contentPlain,
            html: mail.contentHTML
        },
        subject: mail.subject
    });
    if(error) {
        console.error(error);
    }
};

app.post("/send/", (request, response) => {
    const mail: Mail = request.body;
    mailing(mail).then(() => {
        response.send("Successfully send");
    }).catch((error) => {
        response.send(`Error: ${error}`);
    });
});

app.listen(9100, () => {
    console.log("Started on 9100");
});
