import './Shop.css';
import React from 'react';
import ReactDOM from 'react-dom';

class Shop extends React.Component {
  render() {
    return (
    	<div>
    	<h1>Shop</h1>
      	<p>{JSON.stringify(this.props.products)}</p>
      	<button className="btn btn-primary">Click Me</button>
      	</div>
      );
  }
}


export default Shop;