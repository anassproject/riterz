const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		max: 255
	},
	authorId: {
		type: String,
		required: true,
	},
	authorName: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	genre: {
		type: String,
		required: true,
		max: 255,
	},
	link: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('book', bookSchema)