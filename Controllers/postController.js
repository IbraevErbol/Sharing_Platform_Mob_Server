import { fileURLToPath } from "url";
import fs from "fs";
import Post from "../Models/postModel.js";
import path, { dirname } from "path";

//---------------Создание поста-------------------

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const imageUrl = req.file
      ? `http://192.168.0.139:2000/uploads/${req.file.filename}`
      : null;

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
      const imagePath = post.imageUrl.replace("http://192.168.0.139:2000", "");
      const filePath = path.join(
        dirname(fileURLToPath(import.meta.url)),
        "..",
        imagePath
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        // console.log("Изображение успешно удалено:", filePath);
      }else{
        console.log("Изображение не найдено:", filePath);
      }
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
