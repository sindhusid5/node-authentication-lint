const jwt = require('jsonwebtoken')
const fileHelper = require('../utils/fileHelper')

const generateAuthToken = (userId) => {
  return jwt.sign({ id: userId }, '!3dtrfe4$sfyea', { expiresIn: '1h' })
}

const getAllUsers = async (req, res) => {
  try {
    const users = await fileHelper.readUsers()
    return res.json(users)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const loggedInUserId = req.auth.id

    // Check if the requested user ID matches the ID of the authenticated user
    if (userId !== loggedInUserId) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    const users = await fileHelper.readUsers()

    const user = users.find((u) => u.id === userId)
    if (!user) {
      return res.status(404).json({ error: `User with id ${userId} not found` })
    }

    return res.json(user)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

const addUser = async (req, res) => {
  try {
    // Check if the user is authorized (user ID is 1)
    if (req.auth.id !== 1) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    let { id, name, email } = req.body
    id = parseInt(id, 10)

    if (!id || !name || !email) {
      return res
        .status(400)
        .json({ error: 'id, name, email fields are needed' })
    }

    const user = { id, name, email }

    await fileHelper.appendUser(user)

    return res.json(user)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

const loginUser = async (req, res) => {
  try {
    // Assuming you have retrieved the user ID from the request or your user database
    const userId = 1

    // Generate authentication token with the user ID
    const token = generateAuthToken(userId)

    // Respond with the generated token
    return res.json({ token })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = { getAllUsers, getUserById, addUser, loginUser }
