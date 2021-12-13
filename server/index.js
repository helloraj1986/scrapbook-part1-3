import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

//use routes
app.use('/posts', postRoutes)
app.use('/user', userRoutes)
//welcome to api
app.get('/', (req, res) =>{
	res.send('Hello to scrapbook API')
})

//database mongodb cloud atlas
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000

//database connection
mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`)))
	.catch((error) => console.log(error.message))

// mongoose.set('useFindAndModify', false)
