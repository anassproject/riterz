import React from 'react';
import { Link } from 'react-router-dom'
import '../style.css'
import axios from 'axios'

export default class bookComp extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			book: {}
		}
	}

	componentDidMount(){
		let id = this.props.match.params.id
		axios.get('/api/books/' + id)
			.then(res => {
				this.setState({ book: res.data })
			})
			.catch(err => console.log(err))
	}

	render(){
		return(
			<div className="bookComp section-wrapper">
				
				<div className="bookComp-book">
					<h3 className="bookComp-title">{this.state.book.title} </h3>
					<p>by {this.state.book.authorName}</p>
					<p className="bookComp-description">Description: {this.state.book.description} </p>
					<p className="bookComp-genre">Genre: {this.state.book.genre} </p>
					<a className="bookComp-link" href={this.state.book.link} target="_blank">Read/Download</a>
				</div>

			</div>
		)
	}

}