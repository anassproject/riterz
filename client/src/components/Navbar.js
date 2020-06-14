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
					<div className="logo"><Link className="logo-link" to="/">RITERZ</Link></div>
					<div className="burger-btn">B</div>
				</div>
				<div className="menu">
					<ul>
						<li><Link className="menu-link" to="/books" >browse books</Link></li>
						<li><Link className="menu-link" to="/login" >login</Link></li>
						<li><Link className="menu-link" to="/register" >register</Link></li>
					</ul>
				</div>
			</nav>
		)
	}

}
/*


*/