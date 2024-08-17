const express = require('express');
const axios = require('axios').default;
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();

    // Fetch photos for each post and add them to the post object
    const postsWithImages = await Promise.all(
      posts.map(async (post) => {
        const { data: photos } = await axios.get(
          `https://jsonplaceholder.typicode.com/albums/${post.id}/photos`
        );

        return {
          ...post,
          images: photos.map(photo => ({ url: photo.url })),
        };
      })
    );

    res.json(postsWithImages);
  } catch (error) {
    console.error('Error fetching posts with images:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts with images.' });
  }
});

module.exports = router;
