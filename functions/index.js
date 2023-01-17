import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
import functions from 'firebase-functions'
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();
const configuration = new Configuration({
  organization: "org-EvVHU27T5orMvKehTCjNsoKV",
  apiKey: process.env.OPENAI_SECRET_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: true}));
const port = 3080;
app.post("/question-post", async (req, res) => {
  const { message, currentModel, newTemp, tokens } = req.body;

  const response = await openai.createCompletion({
    model: `${currentModel}`,
    prompt: `${message}`,
    max_tokens: Number(tokens),
    temperature: newTemp,
  });
  res.status(200).json({message: response.data.choices[0].text})
});

app.get("/models", async (req, res) => {
  const response = await openai.listEngines();

  res.json({ models: response.data.data });
});
app.listen(port, (req, res) => {
  console.log("listening on port 3080");
});
export const api = functions.https.onRequest(app);