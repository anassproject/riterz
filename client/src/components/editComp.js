import React from 'react';
import { Link } from 'react-router-dom'
import '../style.css'
import axios from 'axios'

export default class editComp extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			isLoggedIn: false,
			book: {},
			title: "",
			description: "",
			genre: "",
			link: "",
			msgColor: ""
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount(){
		let token = localStorage.getItem('auth-token')
		if(!token) return;
		// token exists (logged in)
		this.setState({ isLoggedIn: true })
		let id = this.props.match.params.id
		axios.get('/api/books/' + id)
			.then(res => {
				this.setState({
					 book: res.data,
					 title: res.data.title,
					 description: res.data.description,
					 genre: res.data.genre,
					 link: res.data.link,
				})
			})
			.catch(err => {
				this.setState({msgColor: "red"})
				document.querySelector('.validation-msg').innerHTML = err.response.data
			})
	}
	handleChange(e){
		this.setState({ [e.target.name]: e.target.value })
	}
	handleSubmit(e){
		e.preventDefault()
		let id = this.props.match.params.id
		let editedBook = {}
		const {title, description, genre, link} = this.state
		if(title != "") editedBook.title = title
		if(description != "") editedBook.description = description
		if(genre != "") editedBook.genre = genre
		if(link != "") editedBook.link = link
		const token = localStorage.getItem('auth-token')
		axios.patch('/api/books/edit/' + id , editedBook, { headers: { 'auth-token': token } })
			.then(res => {
				this.setState({msgColor: "lightgreen"})
				document.querySelector('.validation-msg').innerHTML = res.data
				window.location = "/my-books"
			})
			.catch(err => {
				this.setState({msgColor: "red"})
				document.querySelector('.validation-msg').innerHTML = err.response.data
			})
	}

	render(){
		return(
			<div className="editComp section-wrapper">
				<div className="validation-msg" style={{ background: this.state.msgColor }} ></div>
				{
					this.state.isLoggedIn ? 
					<div>
						<h2 className="section-header">Edit "{this.state.book.title}"</h2>
						<p className="section-header">Leave the field empty to keep the current value!</p>
						<form onSubmit={this.handleSubmit}>
							<input type="text" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange} /><br/>
							<input type="text" placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange} /><br/>
							<input type="text" placeholder="Genre" name="genre" value={this.state.genre} onChange={this.handleChange} /><br/>
							<input type="text" placeholder="Link" name="link" value={this.state.link} onChange={this.handleChange} /><br/>
							<input className="create-btn" type="submit" value="Save Edit"/>
						</form>
					</div>
					:
					<h2>No user Logged in!</h2>
				}
			</div>
		)
	}

}