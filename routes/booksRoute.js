const express = require('express')
const router = express.Router()
const verify = require('../verify')
const User = require('../models/User')
const Book = require('../models/Book')

// get my own books (private route)
router.get('/my-books', verify, async (req, res) => {
	// get user id
	const userId = req.user.id
	// fetch and send back the user books
	try {
		const userBooks = await Book.find({ authorId: userId })
		res.json(userBooks)
	}catch(err){
		res.status(400).json({msg: err})
	}
})

// get all books
router.get('/', async (req, res) => {
	// send back all the books in db
	try {
		const books = await Book.find()
		res.json(books)
	}catch(err){
		res.status(400).json({msg: err})
	}
})

// get specific book
router.get('/:id', async (req, res) => {
	try {
		const book = await Book.findOne({ _id: req.params.id })
		res.json(book)
	}catch(err){
		res.status(400).json({msg: err})
	}
})

// create new book (protected)
router.post('/create', verify , async (req, res) => {
	// get authorId from verify (token)
	const authorId = req.user.id
	const authorName = req.user.name
	// get post body
	const {title, description, genre, link} = req.body
	// create and save new book
	const newBook = new Book({title, authorId, authorName, description, genre, link})
	try {
		const savedBook = await newBook.save()
		res.json("book created!")
	}catch(err){
		res.status(400).json({msg: err})
	}
})

// delete specific book (protected)
router.delete('/delete/:id', verify , async (req, res) => {
	// we check if the book is owned by the author with token, then delete
	let tokenAuthor = req.user.id
	try {
		const book = await Book.findOne({ _id: req.params.id })
		if(book.authorId != tokenAuthor) return res.status(400).json("this is not your book, you can't delete it!")
		const deletedbook = await book.remove()
		res.json("book deleted!")
	}catch(err){
		res.status(400).json({msg: err})
	}
})

// edit book (protected)
router.patch('/edit/:id', verify , async (req, res) => {
	// get id, edit, save
	let tokenAuthor = req.user.id
	try {
		const book = await Book.findOne({ _id: req.params.id })
		if(book.authorId != tokenAuthor) return res.status(400).json("this is not your book, you can't edit it!")
		// edit here and then save
		book.title = req.body.title ? req.body.title : book.title
		book.description = req.body.description ? req.body.description : book.description
		book.genre = req.body.genre ? req.body.genre : book.genre
		book.link = req.body.link ? req.body.link : book.link
		const editedBook = await book.save()
		res.json("book edited!")
	}catch(err){
		res.status(400).json({msg: err})
	}
})

module.exports = router