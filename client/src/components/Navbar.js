import React from 'react';
import { Link } from 'react-router-dom'
import '../style.css'

export default class Navbar extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			
		}
	}
	//componentDidMount(){}

	render(){
		return(
			<nav className="nav">
				<div className="lb">
					<div className="logo"><Link className="logo-link" to="/"><b>RITERZ</b></Link></div>
					<div className="burger-btn"><i className="fas fa-bars"></i></div>
				</div>
				<div className="menu">
					<ul>
						<li><Link className="menu-link" to="/books" ><i className="fas fa-book-open"></i>&ensp;Browse books</Link></li>
						<li><Link className="menu-link" to="/login" ><i className="fas fa-user"></i>&ensp;Login</Link></li>
						<li><Link className="menu-link" to="/register" ><i className="fas fa-user-plus"></i>&ensp;Register</Link></li>
					</ul>
				</div>
			</nav>
		)
	}

}
/*


*/