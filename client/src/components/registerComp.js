import React from 'react';
import { Link } from 'react-router-dom'
import '../style.css'
import axios from 'axios'

export default class registerComp extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			name: "",
			email: "",
			password: "",
			msgColor: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	//componentDidMount(){}

	handleChange(e){
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit(e){
		e.preventDefault()
		const {name, email, password} = this.state
		const newUser = {name, email, password}
		axios.post('/api/user/register', newUser)
			.then(res => {
				this.setState({ msgColor: "lightgreen" })
				document.querySelector('.validation-msg').innerHTML = res.data
				window.location = "/login"
			})
			.catch(err => {
				this.setState({ msgColor: "red" })
				document.querySelector('.validation-msg').innerHTML = err.response.data
			})
	}

	render(){
		return(
			<div className="registerComp section-wrapper">
				<div className="validation-msg" style={{ background: this.state.msgColor }}></div>
				<h2 className="section-header" >New? Register now for FREE!</h2>
				<form onSubmit={this.handleSubmit} >
					<input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} /><br/>
					<input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} /><br/>
					<input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} /><br/>
					<input type="submit" value="Register" className="form-btn register-btn" />
				</form>
			</div>
		)
	}

}