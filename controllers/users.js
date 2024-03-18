const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password) {
    return response.status(401).send({ error: 'password missing' })
  }

  if (!username) {
    return response.status(401).send({ error: 'username missing' })
  }

  if (password.length < 3) {
    return response.status(401).send({ error: 'password too short' })
  }

  if (username.length < 3) {
    return response.status(401).send({ error: 'username too short' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
    id: 1,
  })
  response.json(users)
})

module.exports = usersRouter
