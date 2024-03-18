const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
  {
    /* Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      .catch((error) => next(error))
*/
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }

  //const user = await User.findById(user.id)

  if (!('likes' in body)) {
    body['likes'] = 0
  }
  if (!('title' in body)) {
    return response.status(400).send({ error: 'title missing' })
  }
  if (!('url' in body)) {
    return response.status(400).send({ error: 'url missing' })
  }

  //const blog = new Blog(body)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })
  await blog.populate('user', { username: 1, name: 1 })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }
  // const user = await User.findById(decodedToken.id)
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  try {
    if (user._id.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
    } else {
      return response.status(401).json({ error: 'Deleting blog forbidden' })
    }
  } catch (error) {
    return response.status(401).json({ error: error.message })
  }

  //await Blog.findByIdAndRemove(request.params.id)
  //console.log("Delete requesti", request.token)
  response.status(200).json({ message: `blog '${blog.title}' deleted` })
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate(
    'user',
    { username: 1, name: 1 }
  )
  response.status(204).end()
})

module.exports = blogsRouter
