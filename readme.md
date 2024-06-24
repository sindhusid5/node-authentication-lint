 
# NodeJS - Authentication & Authorization with ESLint
 

## Instructions

1. **Clone the repository to your local machine:**

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory:**

   ```bash
   cd assignment6
   ```

4. **Install dependencies:**

   ```bash
   npm install
   ```

5. **Check for linting errors and fix them (optional but recommended):**

   ```bash
   npm run format    # Format code using Prettier
   npm run lint      # Find linting errors using ESLint
   npm run lint:fix  # Fix linting errors automatically
   ```

6. **Start the ExpressJS application:**

   ```bash
   npm start
   ```

   or

   ```bash
   node app.js
   ```

7. **Once the server is running, you can access the following routes:**

   - **POST /users/login:**
     - Returns a token which serves as the authorization header for subsequent requests.

   - **GET /users/:id:**
     - Returns details of a user with a specific ID.

   - **POST /users:**
     - Adds a new user to the data file, but only allows this operation if the request is sent from user ID = 1 (assuming this logic is implemented in your application).

   - **Example URLs:**
     - To log in: `http://localhost:4000/users/login`
     - To fetch a user with ID 1: `http://localhost:4000/users/1`
     - To add a user: `http://localhost:4000/users`

   - New users added will be appended at the beginning of the `users.json` file under the `sample` folder.

8. **To stop the server, press Ctrl + C in the terminal.**
 