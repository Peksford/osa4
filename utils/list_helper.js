const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, obj) => obj.likes + total, 0)
}

const favoriteBlogs = (blogs) => {
  let maxLike_var = 0
  let title_var = ''
  let author_var = ''

  const returnBlog = {
    title: '',
    author: '',
    likes: 0,
  }

  for (const blog of blogs) {
    if (blog.likes > maxLike_var) {
      maxLike_var = blog.likes
      title_var = blog.title
      author_var = blog.author
    }
  }
  returnBlog['title'] = title_var
  returnBlog['author'] = author_var
  returnBlog['likes'] = maxLike_var

  return returnBlog
  //return blogs.reduce((highest, obj) => Math.max(highest, obj.likes), 0)
}

const mostBlogs = (blogs) => {
  var authorCounts = {
    author: '',
    blogs: 0,
  }

  blogs.forEach(function (blog) {
    var author = blog.author

    if (authorCounts['author'] === author) {
      authorCounts['blogs'] = authorCounts['blogs'] + 1
      authorCounts['author'] = blog.author
    } else {
      authorCounts['author'] = blog.author
      authorCounts['blogs'] = 1
    }
  })

  return authorCounts
}

const mostLikes = (blogs) => {
  var likeCounts = {}

  blogs.forEach(function (blog) {
    var like = blog.likes
    var author = blog.author

    if (likeCounts[author] === undefined) {
      likeCounts[author] = like
    } else {
      likeCounts[author] += like
    }
  })

  var likedAuthor = ''
  var likes = 0
  var returnLikes = { author: '', likes: 0 }

  for (const i in likeCounts) {
    if (likeCounts[i] > likes) {
      likedAuthor = i
      likes = likeCounts[i]
    }
  }

  returnLikes['author'] = likedAuthor
  returnLikes['likes'] = likes

  return returnLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes,
}
