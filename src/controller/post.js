const Post = require("../model/post");

module.exports.createPost = async (req, res) => {
  const { title, body, photo } = req.body;
  if (!title || !body) {
    return res.status(422).json({ error: "Please fill the required fields" });
  }
  req.user.password = undefined;
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    postedBy: req.user,
  });
  const createdPost = await post.save();
  if (createdPost) {
    return res.status(201).json({ post: createdPost });
  } else {
    return res.status(422).json({ message: "Post not Created" });
  }
};

module.exports.getPosts = async (req, res) => {
  const posts = await Post.find({}).populate("postedBy", "_id name");
  if (posts.length > 0) {
    return res.status(200).json({ posts: posts });
  } else {
    return res.status(404).json({ message: "posts not found" });
  }
};

module.exports.getPostsByUser = async (req, res) => {
  const posts = await Post.find({ postedBy: req.user._id }).populate(
    "postedBy",
    "_id name"
  );
  if (posts.length > 0) {
    return res.status(200).json({ posts: posts });
  } else {
    return res.status(404).json({ message: "posts not found" });
  }
};

module.exports.likePost = async (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { 
        $push: {
            likes: req.body.postId
        }
    },
    function (err, docs) {
      if (err) {
        return res.status(404).json({ err: err });
      } else {
        return res.status(200).json({ posts: docs });
      }
    }
  )
};

module.exports.unlikePost = async (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { 
        $pull: {
            likes: req.body.postId
        }
    },
    function (err, docs) {
      if (err) {
        return res.status(404).json({ err: err });
      } else {
        return res.status(200).json({ posts: docs });
      }
    }
  )
};
