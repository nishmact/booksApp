const client = require('./config/elasticsearch');

(async () => {
  try {
    const response = await client.info();
    console.log('✅ Elasticsearch connected successfully:', response);
  } catch (error) {
    console.error('❌ Elasticsearch connection failed:', error);
  }
})();
