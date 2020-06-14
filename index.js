const express = require('express')
const mongoose = require('mongoose')
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
	'mongodb+srv://anass:anass123456@test-t9rte.mongodb.net/test?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	()=> console.log('connected to db!')
)
const PORT = process.env.PORT || 5000

// for production
if(process.env.NODE_ENV === 'production'){
	app.use(express.static('client/build'))
}

app.listen(PORT, ()=> console.log('Server running!'))