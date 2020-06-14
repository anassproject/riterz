import React from 'react';
import { Link } from 'react-router-dom'
import '../style.css'
import axios from 'axios'
import dateSince from '../dateSince'

export default class booksComp extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			books: []
		}
	}

	componentDidMount(){
		axios.get('/api/books')
			.then(res => this.setState({ books: res.data }))
			.catch(err => console.log(err))
	}

	render(){
		return(
			<div className="booksComp section-wrapper">
				<h2 className="section-header">browse books</h2>
				<div className="books-cont">
					{
						this.state.books.map((book, index) => {
							return(
								<div className="booksComp-book" key={index} >
									<div>
										<h3>{book.title} </h3>
										<p>by {book.authorName}</p>
									</div>
									<div className="booksComp-bookDetails">
										<Link to={"/book/" + book._id } ><button className="viewDetailsBtn" >view details</button></Link>
										<p className="date-since" > {dateSince(book.date)} </p>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}

}