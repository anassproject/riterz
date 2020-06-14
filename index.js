const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
//const cors = require('cors')

const app = express()

// BP MW
app.use(express.json())
//app.use(cors())

// routes
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/books', require('./routes/booksRoute'))

// connect to db
mongoose.connect(
	'mongodb+srv://anass:userpass123@cluster0-u0ecs.mongodb.net/<dbname>?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	()=> console.log('connected to db!')
)
const PORT = process.env.PORT || 5000

// for production

if(process.env.NODE_ENV === 'production'){
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	})
}

app.listen(PORT, ()=> console.log('Server running!'))