import React from 'react';
import { Link } from 'react-router-dom'
import '../style.css'
import axios from 'axios'

export default class myBooksComp extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			myBooks: [],
			isLoggedIn: false
		}
		this.handleDelete = this.handleDelete.bind(this)
	}

	componentDidMount(){
		const token = localStorage.getItem('auth-token')
		if(!token) return;
		// if token exists
		this.setState({ isLoggedIn: true })
		axios.get('/api/books/my-books', { headers: { 'auth-token': token } })
			.then(res => this.setState({ myBooks: res.data }))
			.catch(err => console.log(err))
	}

	handleDelete(e){
		let id = e.target.id
		let token = localStorage.getItem('auth-token')
		axios.delete('/api/books/delete/' + id, { headers: { 'auth-token': token } })
			.then(res => {
				document.querySelector('.myBooksMsgs').innerHTML = res.data
				window.location = "/my-books"
			})
			.catch(err => console.log(err))
	}

	render(){
		return(
			<div className="myBooksComp section-wrapper">
				<h2 className="myBooksMsgs"></h2>
				{	
					this.state.isLoggedIn ?
						this.state.myBooks.length > 0 ?
						<div>
							{
								this.state.myBooks.map((book, index) => {
									return(
										<div key={index} className="myBook-item">
											<Link className="myBooks-link" to={"/book/" + book._id} ><h2> {book.title} </h2></Link>
											<div className="myBooks-btns">
												<button className="myBooks-delete" onClick={this.handleDelete} id={book._id} ><i className="far fa-trash-alt"></i>&ensp;delete book</button>
												<Link to={"/edit/" + book._id} ><button className="myBooks-edit"><i className="far fa-edit"></i>&ensp;edit book</button></Link>
											</div>
										</div>
									)
								})
							}
							<Link className="Link" to="/create">Click here to add new books!</Link>
						</div>
						: 	<div>
								<h2>No books to display!</h2>
								<Link className="Link" to="/create">Click here to add new books!</Link>
							</div>
					: <h2>No user Logged in!</h2>
				}
			</div>
		)
	}

}