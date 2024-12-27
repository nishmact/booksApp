const client = require('../config/elasticsearch'); // Import Elasticsearch client

const searchBooks = async (req, res) => {
    try {
        console.log("search...")
        const { query } = req.query;
        const result = await client.search({
            index: 'books',
            body: {
                query: {
                    multi_match: {
                        query,
                        fields: ['title', 'author', 'description'],
                    },
                },
            },
        });
        console.log("search result...",result)
        res.status(200).json(result.hits.hits.map(hit => hit._source));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { searchBooks };
