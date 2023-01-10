import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
import express from 'express'
import cors from 'cors';
import bodyParser from "body-parser";
dotenv.config();
const configuration = new Configuration({
    organization: "org-EvVHU27T5orMvKehTCjNsoKV",
    apiKey: process.env.OPENAI_SECRET_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3080;

app.post('/', async (req, res) => {
    const { message } = req.body;
    console.log(message)
    // const response = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: "Say this is a test",
    //     max_tokens: 7,
    //     temperature: 0,
    //   });
    //   console.log(response.data.choices[0].text)
      res.json({
        // data: response.data
        data: message,
      })
})

app.listen(port, (req, res) => {
    console.log("listening on port 3080")
})