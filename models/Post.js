const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  creationDate: { type: Number, default: Date.now }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
