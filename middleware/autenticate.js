const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' })
  }

  jwt.verify(token, '!3dtrfe4$sfyea', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' })
    }
    req.auth = decoded
    next()
  })
}

const authorizeUser = (req, res, next) => {
  if (req.auth.id !== 1) {
    return res.status(403).json({ error: 'Unauthorized' })
  }
  next()
}

module.exports = { authenticateUser, authorizeUser }
