const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { regValidation, logValidation } = require('../validation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res)=>{
	const {name, email, password} = req.body
	// check if all fields provided (no errors)
	const {error} = regValidation(req.body)
	if(error) return res.status(400).send(error.details[0].message)
	// check if email already exists
	const emailUser = await User.findOne({email})
	if(emailUser) return res.status(400).send("email already exists!")
	// encrypt password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)
	// create new user
	const newUser = new User({name, email, password: hashedPassword})
	// save new user to db
	try {
		const savedUser = await newUser.save()
		res.send("new user created successfully!")
	} catch(err){
		res.status(400).send(err)
	}
})

router.post('/login', async (req, res)=>{
	const {email, password} = req.body
	// validate with hapi/joi
	const {error} = logValidation(req.body)
	if(error) return res.status(400).send(error.details[0].message)
	// check if email exists
	const user = await User.findOne({email})
	if(!user) return res.status(400).send("email is not found!")
	// check if password is correct
	const validPassword = await bcrypt.compare(password, user.password)
	if(!validPassword) return res.status(400).send("wrong password!")
	// success
	const token = jwt.sign({ id: user._id, name: user.name }, 'thesecretkeything')
	res.send(token)
})


module.exports = router