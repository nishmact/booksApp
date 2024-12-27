const { Client } = require('@elastic/elasticsearch');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const client = new Client({
  node: process.env.ES_URI, // Elasticsearch server URL
  auth: {
    apiKey: process.env.ES_API_KEY,
  },
});

module.exports = client;
