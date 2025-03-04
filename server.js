import dotenv from 'dotenv'
import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import cors from 'cors'

import { dirname } from 'path'
import path from 'path'
import { fileURLToPath } from 'url'

import helmet from 'helmet'
import xssMiddleware from './middleware/xss.js'
import mongoSanitize from 'express-mongo-sanitize'

import connectDB from './db/connect.js'

import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

import authenticateUser from './middleware/auth.js'

const app = express()
dotenv.config()

const corsOptions = { origin: '*' }
app.use(cors(corsOptions))

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// only when ready to deploy
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(cors())
app.use(express.json())

// for security
app.use(helmet())
app.use(xssMiddleware())
app.use(mongoSanitize())

app.get('/', (req, res) => {
  res.send('Welcome to Jobify!')
})

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

// only when ready to deploy
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 4000

// database connection
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
