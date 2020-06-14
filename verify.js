const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
	const token = req.header('auth-token')
	try {
		const verified = jwt.verify(token, 'thesecretkeything')
		if(!verified) return res.status(401).send("access denied: invalid token!")
		req.user = verified
		next()
	} catch(err) {
		res.status(400).send(err)
	}
}