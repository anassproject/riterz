import React from 'react';
import { Link } from 'react-router-dom'
import '../style.css'
import axios from 'axios'

export default class loginComp extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			email: "",
			password: "",
			userToken: "",
			isLoggedIn: false,
			msgColor: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.logout = this.logout.bind(this)
	}
	componentDidMount(){
		const token = localStorage.getItem('auth-token')
		if(token) this.setState({ isLoggedIn: true })
	}

	handleChange(e){
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit(e){
		e.preventDefault()
		const {email, password} = this.state
		const user = {email, password}
		axios.post('/api/user/login', user)
			.then(res => {
				let token = res.data
				// update state
				this.setState({ userToken: token})
				console.log(token)
				// save token to LS
				localStorage.setItem('auth-token', token)
				this.setState({ msgColor: "lightgreen" })
				document.querySelector('.validation-msg').innerHTML = "Logged in with success!"
				window.location = "/my-books"
			})
			.catch(err => {
				this.setState({ msgColor: "red" })
				document.querySelector('.validation-msg').innerHTML = err.response.data
			})
	}

	logout(){
		this.setState({ isLoggedIn: false })
		localStorage.removeItem('auth-token')
	}

	render(){
			return(
				<div className="loginComp section-wrapper">
					{
						this.state.isLoggedIn ?
						<div>
							<h2 className="section-header" >You are already logged in!</h2>
							<h3><Link className="Link" to="/my-books" >click here to browse and add new books</Link></h3>
							<button onClick={this.logout} className="logout-btn" >Log out</button>
						</div>
						:
						<div>
							<div className="validation-msg" style={{ background: this.state.msgColor }}></div>
							<h2 className="section-header" >Already a member? Login to your account!</h2>
							<form onSubmit={this.handleSubmit} >
								<input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} /><br/>
								<input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} /><br/>
								<input className="form-btn login-btn" type="submit"  value="Login" />
							</form>
						</div>
					}
				</div>
			)
	}

}