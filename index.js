import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
import express from 'express'
dotenv.config();
const configuration = new Configuration({
    organization: "org-EvVHU27T5orMvKehTCjNsoKV",
    apiKey: process.env.OPENAI_SECRET_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
const port = 3080;

app.post('/', async (req, res) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        max_tokens: 7,
        temperature: 0,
      });
      console.log(response.data.choices[0].text)
      res.json({
        data: response.data
      })
})

app.listen(port, (req, res) => {
    console.log("listening on port 3080")
})