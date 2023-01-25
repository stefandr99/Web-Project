const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const d3 = require("d3-sparql");

router.post("/", async (req, res) => {
  const endpoint = req.body.endpoint;
  const query = req.body.query;
  let graphSuggestion;
  try {
    graphSuggestion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${query}\n\n\nWhat kind of graph would work best with this data? Also generate natural language descriptions of the data.\n`,
      temperature: 0,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
  } catch (error) {}

  const results = await d3.sparql(endpoint, query);

  res.send({
    graphSuggestion: graphSuggestion
      ? graphSuggestion.data.choices[0].text
      : "Unable to parse input",
    data: results,
  });
});

module.exports = router;
