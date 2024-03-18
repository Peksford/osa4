const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'TestiBlogi',
    author: 'Peksi',
    url: 'peksiblogi.fi',
    likes: '2',
    user: '64fb2c46776239bb4ccdf6ee',
  },
  {
    title: 'jee',
    author: 'juu',
    url: 'joo.fi',
    likes: '4',
    user: '64fb2c46776239bb4ccdf6ee',
  },
  {
    title: 'asdfg',
    author: 'fghj',
    url: 'ofihmg.fi',
    likes: '7',
    user: '64fb2c46776239bb4ccdf6ee',
  },
]

const initialUsers = [
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'swordfish',
    id: '64fb2c46776239bb4ccdf6ee',
  },
]

{
  /*const createUser = async () => {
    newUser = initialUsers[0]

    response_newUser = await api
    .post('/api/users')
    .send(newUser)

    newLogin = {
        username: response_newUser.body.username,
        password: response_newUser.body.password
    }

    login_newUser = await api
    .post('/api/login')
    .send(newLogin)
    
    console.log("tokenia nakyyko?", login_newUser.body)
}
*/
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  try {
    const users = await User.find({})
    return users.map((u) => u.toJSON())
  } catch (error) {
    throw error
  }
}

module.exports = {
  initialUsers,
  initialBlogs,
  blogsInDb,
  usersInDb,
}
