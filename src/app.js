const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>✅ Task Manager API</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        text-align: center;
                        padding: 50px;
                    }
                    h1 {
                        color: #333;
                    }
                    code {
                        background-color: #eee;
                        padding: 2px 6px;
                        border-radius: 4px;
                        font-family: monospace;
                    }
                    .routes {
                        margin-top: 30px;
                        text-align: left;
                        max-width: 600px;
                        margin-left: auto;
                        margin-right: auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    }
                </style>
            </head>
            <body>
                <h1>📋 Task Manager API is Running</h1>
                <p>This is the backend server for your personal Task Manager project.</p>
                
                <div class="routes">
                    <h2>Available Endpoints</h2>
                    <ul>
                        <li><code>POST /users</code> → Register</li>
                        <li><code>POST /users/login</code> → Login</li>
                        <li><code>GET /users/me</code> → View Profile (Auth required)</li>
                        <li><code>PATCH /users/me</code> → Update Profile</li>
                        <li><code>POST /tasks</code> → Create Task (Auth required)</li>
                        <li><code>GET /tasks</code> → Get Tasks (Auth required)</li>
                        <li><code>DELETE /users/me</code> → Delete User</li>
                    </ul>
                </div>
            </body>
        </html>
    `);
});

module.exports = app