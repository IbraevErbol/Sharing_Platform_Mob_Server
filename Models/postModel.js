import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String, // Путь к изображению на сервере
      required: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users', // Ссылка на модель User
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
