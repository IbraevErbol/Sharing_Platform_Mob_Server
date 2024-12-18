import { fileURLToPath } from "url";
import fs from "fs";
import Post from "../Models/postModel.js";
import path, { dirname } from "path";
import cloudinary from '../config/cloudinary.js';

//---------------Создание поста-------------------

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // const imageUrl = req.file
    //   ? `https://sharing-platform-mob-server.onrender.com/uploads/${req.file.filename}`
    //   : null;

    const imageUrl = req.file ? req.file.secure_url : null;

    const newPost = new Post({
      title,
      content,
      imageUrl,
      author: req.user._id,
    });

    await newPost.save();
    res.status(201).json({ message: "Пост создан", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при создании поста" });
  }
};

//----------Вывод всех постов в HomeScreen---------------

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось загрузить посты" });
  }
};

//----------Вывод поста в стр PostDetailScreen-----------

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    // const post = await Post.findById(postId);
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!post) {
      return res.status(404).json({ message: "Пост не найден" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Ошибка при загрузке поста:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

//------------Получение всех постов пользователя-----------

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const posts = await Post.find({ author: userId });
    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении постов пользователя" });
  }
};

//---------------Удаление поста---------------------------

export const deletePosts = async (req, res) => {
  const { id: postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Пост не найден" });
    }

    if (post.imageUrl) {
      const imagePublicId = post.imageUrl.split('/').pop().split('.')[0];
      // const imagePath = post.imageUrl.replace("https://sharing-platform-mob-server.onrender.com", "");
      cloudinary.uploader.destroy(imagePublicId, (error, result) => {
        if (error) {
          console.error("Ошибка при удалении изображения из Cloudinary:", error);
          return res.status(500).json({ message: "Ошибка при удалении изображения" });
        }
        console.log("Изображение удалено из Cloudinary:", result);
      });
      
    }
    
    const deletePost = await Post.findByIdAndDelete(postId);
    if (!deletePost) {
      return res.status(404).json({ message: "Пост не найден" });
    }
    res.status(200).json({ message: "Пост успешно удален" });
  } catch (error) {
    console.error("Error during post deletion:", error);
    res.status(500).json({ message: "Ошибка при удалении поста" });
  }
};
