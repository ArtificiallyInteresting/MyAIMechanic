const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3001;
const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

app.use(cors());
app.use(bodyParser.json());

app.post('/api/car-info', (req, res) => {
  const carInfo = req.body;
  console.log('Received car info:', carInfo);
  res.json({ message: 'Car information received successfully' });
});

app.post('/api/get-diagnostic', async (req, res) => {
  const jobDescription = typeof req.body === 'object' && 'text' in req.body ? req.body.text : '';
  const prompt = `You are an expert mechanic. Diagnose the car with the following description:
  Make: ${req.body.make}, Model: ${req.body.model}, Year: ${req.body.year}.
  The customer stated that the car has the following issue: ${req.body.issue}.
  Respond with a detailed diagnostic report of the car's issue.
  `;
  console.log(prompt)
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({diagnostic: completion.choices[0].message.content || 'No response generated'});
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to generate response from OpenAI');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});