import './Calculator.css';
import React from 'react';
import ReactDOM from 'react-dom';

class Display extends React.Component {

	render() {
		return(
			<div className="display">
				{this.props.value}
			</div>
		)
	}
}

class Button extends React.Component {

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e) {
		return this.props.onClick(this.props.value);
	}
	render() {
			if (this.props.type === "number") {
				return(
				<button 
				className="btn btn-primary btn-block"
				onClick={this.handleClick}
				>
					{this.props.value}
				</button>
				); 
			} else if (this.props.type === "function") {
				return(
				<button 
				className="btn btn-secondary btn-block"
				onClick={this.handleClick}
				>
					{this.props.value}
				</button>
				); 
			}
	}
}
class Calc extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: 0,
		};

		this.handleClickNumnberBtn = this.handleClickNumnberBtn.bind(this);
		this.handleClickFunctionBtn = this.handleClickFunctionBtn.bind(this);

		this.buttons = [
			// row
			{label:"C", 	type: "function"},
			{label:"+/-", 	type: "function"},
			{label:"%", 	type: "function"},
			{label:"/", 	type: "function"},
			// row
			{label:"7", 	type: "number"},
			{label:"8", 	type: "number"},
			{label:"9", 	type: "number"},
			{label:"x", 	type: "function"},
			// row
			{label:"4", 	type: "number"},
			{label:"5", 	type: "number"},
			{label:"6", 	type: "number"},
			{label:"-", 	type: "function"},
			// row
			{label:"1", 	type: "number"},
			{label:"2", 	type: "number"},
			{label:"3", 	type: "number"},
			{label:"+", 	type: "function"},
			// row
			{label:"0", 	type: "number"},
			{label:".", 	type: "number"},
			{label:"=", 	type: "function"},

		];
	}
	handleClickNumnberBtn(buttonValue) {
		//console.log(buttonValue);
		const value = this.state.value;

		this.setState({
			value: !value ? buttonValue : value.toString().concat(buttonValue.toString())
		});
	}
	handleClickFunctionBtn(buttonValue) {
		alert("Next step - add functions for these buttons: "+buttonValue);

		this.setState({
			value: null
		});
	}
	render() {
		return(
		<div className="calc">

	    	<div className="row">
		    	<div className="col">
		      		<Display 
		      		value={this.state.value}
		      		/>
		      	</div>
	      	</div>

		    <div className="button-pad">

		    	<div className="row">
			      	{this.buttons.map((item) => 
			    		<div
			    		key={item.label}
			    		className={item.label === "0" ? "col-6" : "col-3"} 
			    		>
				      		<Button
				      		value={item.label} 
				      		type={item.type} 
				      		onClick={
				      			item.type === "number" 
				      			? this.handleClickNumnberBtn 
				      			: this.handleClickFunctionBtn
				      			}
				      		/>
				      	</div>
			    		)
			    	}
		      	</div>

	      	</div>

      	</div>
		)
	}
}

class Calculator extends React.Component {
  render() {
    return (
    	<div className="container">
	    	<div className="row">
		    	<div className="col">
		      		<Calc />
		      	</div>
	      	</div>
      	</div>
      );
  }
}


export default Calculator;