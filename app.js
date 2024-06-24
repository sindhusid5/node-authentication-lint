const express = require('express')
const app = express()
const routes = require('./routes/user')
const middleware = require('./middleware/routingMiddleware')
const { authenticateUser, authorizeUser } = require('./middleware/autenticate')
const PORT = 4000

app.use(express.json())
app.use(middleware.routeLogger)

app.post('/users/login', routes.loginUser) // No authentication required for login

// Apply authentication middleware for the remaining routes
app.use(authenticateUser)

app.get('/users', routes.getAllUsers) // Apply authentication middleware

app.get('/users/:id', routes.getUserById) // Apply authorization middleware for user-specific routes
app.post('/users', authorizeUser, routes.addUser)

app.use(middleware.errorHandler)
// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
