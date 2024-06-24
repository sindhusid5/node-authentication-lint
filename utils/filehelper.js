const fs = require('fs').promises
const path = require('path')

const usersFilePath = path.join(__dirname, '../samples/users.json')

const readUsers = async () => {
  const data = await fs.readFile(usersFilePath, 'utf8')
  return JSON.parse(data)
}

const appendUser = async (user) => {
  try {
    // Read the existing users from the file
    const existingUsers = await readUsers()

    // Add the new user to the beginning of the existing users array
    existingUsers.unshift(user)

    // Write the updated users array back to the file
    await fs.writeFile(usersFilePath, JSON.stringify(existingUsers, null, 2))

    console.log('User appended to the file successfully.')
  } catch (error) {
    console.error('Error appending user to file:', error)
    throw error
  }
}

module.exports = { readUsers, appendUser }
