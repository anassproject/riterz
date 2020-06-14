import React from 'react';
import { Link } from 'react-router-dom'
import '../style.css'

export default class homeComp extends React.Component {
	constructor(props){
		super(props)
		this.state = {}
	}

	componentDidMount(){
		
	}

	render(){
		return(
			<div className="homeComp section-wrapper">
				<h1 className="section-header" >Welcome to Riterz!</h1>
				<h3 className="section-header" >A Website for Amateur Writers to Share Their Works!</h3>
			</div>
		)
	}

}