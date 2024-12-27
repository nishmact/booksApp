const client = require("../config/elasticsearch");

exports.indexBook = async (book) => {
  try {
    const { _id, ...bookWithoutId } = book.toObject();

    await client.index({
      index: "books",
      id: _id.toString(),
      body: bookWithoutId,
    });

    console.log("Book indexed successfully");
  } catch (error) {
    console.error("Error indexing book:", error);
  }
};

exports.updateIndex = async (book) => {
  try {
    const response = await client.get({
      index: "books",
      id: book._id.toString(),
    });

    if (!response || !response.body || !response.body.found) {
      console.log(
        `Book with ID ${book._id} not found in Elasticsearch. Creating a new document.`
      );

      const { _id, ...bookWithoutId } = book.toObject();
      await client.index({
        index: "books",
        id: _id.toString(),
        body: bookWithoutId,
      });
    } else {
      await client.update({
        index: "books",
        id: book._id.toString(),
        body: { doc: book.toObject() },
      });
    }

    console.log("Book updated or created successfully");
  } catch (error) {
    console.error("Error updating or creating book:", error);
  }
};

exports.deleteIndex = async (id) => {
  try {
    await client.delete({
      index: "books",
      id: id.toString(),
    });
    console.log("Book deleted successfully");
  } catch (error) {
    console.error("Error deleting book:", error);
  }
};
