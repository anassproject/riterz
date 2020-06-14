import React from 'react';
import { Link } from 'react-router-dom'
import '../style.css'
import axios from 'axios'

export default class createComp extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			title: "",
			description: "",
			genre: "",
			link: "",
			msgColor: "",
			isLoggedIn: false
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
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
		const token = localStorage.getItem('auth-token')
		if(!token) return;
		//token exists
		const {title, description, genre, link} = this.state
		const newBook = {title, description, genre, link}
		axios.post('/api/books/create', newBook, { headers: { 'auth-token': token } })
			.then(res => {
				this.setState({msgColor: "lightgreen"})
				document.querySelector('.validation-msg').innerHTML = res.data
				window.location = "/my-books"
			})
			.catch(err => {
				this.setState({msgColor: "red"})
				document.querySelector('.validation-msg').innerHTML = "Error: fill all fields!"
			})
	}

	render(){
		return(
			<div className="createComp section-wrapper">
				<div className="validation-msg" style={{ background: this.state.msgColor }}></div>
				{
					this.state.isLoggedIn ? 
						<div>
							<h2 className="section-header" >Add a new book</h2>
							<form onSubmit={this.handleSubmit}>
								<input type="text" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} /><br/>
								<input type="text" placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange} /><br/>
								<input type="text" placeholder="Genre" name="genre" value={this.state.genre} onChange={this.handleChange} /><br/>
								<input type="text" placeholder="Link" name="link" value={this.state.link} onChange={this.handleChange} /><br/>
								<input className="create-btn" type="submit" value="Add Book" />
							</form>
						</div>
						:
						<h2>No user Logged in!</h2>
				}
			</div>
		)
	}

}