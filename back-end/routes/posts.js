import { Router } from 'express';

const router = Router();

let posts = [];
let nextId = 1;

const mockAuthorId = '507f1f77bcf86cd799439011';

router.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    posts,
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const post = posts.find((p) => String(p.id) === String(id));
  if (!post) {
    return res.status(404).json({
      success: false,
      error: 'Post not found',
    });
  }
  return res.status(200).json({
    success: true,
    post,
  });
});

router.post('/', (req, res) => {
  const { title, body } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      success: false,
      error: 'title is required',
    });
  }
  const newPost = {
    id: String(nextId++),
    title: title.trim(),
    body: typeof body === 'string' ? body : '',
    authorId: mockAuthorId,
    createdAt: new Date().toISOString(),
  };
  posts.push(newPost);
  return res.status(201).json({
    success: true,
    message: 'Post created successfully',
    post: newPost,
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const post = posts.find((p) => String(p.id) === String(id));
  if (!post) {
    return res.status(404).json({
      success: false,
      error: 'Post not found',
    });
  }
  const { title, body } = req.body;
  if (title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        success: false,
        error: 'title must be a non-empty string when provided',
      });
    }
    post.title = title.trim();
  }
  if (body !== undefined) {
    post.body = typeof body === 'string' ? body : post.body;
  }
  post.updatedAt = new Date().toISOString();
  return res.status(200).json({
    success: true,
    message: 'Post updated successfully',
    post,
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = posts.findIndex((p) => String(p.id) === String(id));
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Post not found',
    });
  }
  posts.splice(index, 1);
  return res.status(200).json({
    success: true,
    message: 'Post deleted successfully',
  });
});

export default router;
