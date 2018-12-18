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

	render() {
			if (this.props.type === "number") {
				return(
				<button className="btn btn-primary btn-block">
					{this.props.value}
				</button>
				); 
			} else if (this.props.type === "function") {
				return(
				<button className="btn btn-secondary btn-block">
					{this.props.value}
				</button>
				); 
			}
	}
}
class Calc extends React.Component {

	render() {
		return(
		<div className="calc">

	    	<div className="row">
		    	<div className="col">
		      		<Display value="888.88" />
		      	</div>
	      	</div>

		    <div className="button-pad">

		    	<div className="row small-gutter">
			    	<div className="col">
			      		<Button value="C" type="function" />
			      	</div>
			    	<div className="col">
			      		<Button value="+/-" type="function" />
			      	</div>
			    	<div className="col">
			      		<Button value="%" type="function" />
			      	</div>
			    	<div className="col">
			      		<Button value="/" type="function" /> 
			      	</div>
		      	</div>

		    	<div className="row small-gutter">
			    	<div className="col">
			      		<Button value="7" type="number" />
			      	</div>
			    	<div className="col">
			      		<Button value="8" type="number" />
			      	</div>
			    	<div className="col">
			      		<Button value="9" type="number"/>
			      	</div>
			    	<div className="col">
			      		<Button value="x" type="function" />
			      	</div>
		      	</div>

		    	<div className="row small-gutter">
			    	<div className="col">
			      		<Button value="4" type="number" />
			      	</div>
			    	<div className="col">
			      		<Button value="5" type="number" />
			      	</div>
			    	<div className="col">
			      		<Button value="6" type="number" />
			      	</div>
			    	<div className="col">
			      		<Button value="-" type="function"/>
			      	</div>
		      	</div>

		    	<div className="row small-gutter">
			    	<div className="col">
			      		<Button value="1" type="number" />
			      	</div>
			    	<div className="col">
			      		<Button value="2" type="number" />
			      	</div>
			    	<div className="col">
			      		<Button value="3" type="number" />
			      	</div>
			    	<div className="col">
			      		<Button value="+" type="function" />
			      	</div>
		      	</div>

		    	<div className="row small-gutter">
			    	<div className="col-6">
			      		<Button value="0" type="number" />
			      	</div>
			    	<div className="col-3">
			      		<Button value="." type="number" />
			      	</div>
			    	<div className="col-3">
			      		<Button value="=" type="function" />
			      	</div>
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