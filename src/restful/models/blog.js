const { Schema } = require("mongoose");

const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
});

module.exports = {
  schema: blogSchema,
};
