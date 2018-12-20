import './Shop.css';
import React from 'react';
import ReactDOM from 'react-dom';


class Product extends React.Component {
	
	render(){
		return(
			<div className="col-4">
				<div className="product">
					<h6 className="name">{this.props.name}</h6>
					<h6 className="price">${this.props.price}</h6>
					<p className="stock-status">{this.props.stocked ? "in stock" : "out of stock"}</p>
			      	<button className="btn btn-sm btn-primary">Add to Cart</button>
		      	</div>
	      	</div>
		)
	}

}

class ProductList extends React.Component {

	render(){
		return(
			<div className="product-list">
				<div className="row">
					{this.props.products.map((p) => 
						<Product 
						name={p.name}
						price={p.price}
						stocked={p.stocked}
						/>
					)}
				</div>
			</div>
		)
	}
}

class CartProduct extends React.Component {

	render(){
		return(
			<div className="cart-product">
				<div className="row">
					<div className="col-5">
							{this.props.name}
					</div>
					<div className="col-5">
							{this.props.price}
					</div>
				</div>
			</div>
			)
	}
}

class CartProductList extends React.Component {

	render(){
		return(
			<div className="cart-product-list">
					{this.props.products.map((p) => 
						<CartProduct 
						name={p.name}
						price={p.price}
						stocked={p.stocked}
						/>
					)}
			</div>
		)
	}
}
class Cart extends React.Component {

	render() {
		return(
			<div className="cart">
				<h4>My Cart</h4>
				<hr />
				<CartProductList products={this.props.products}/>
			</div>
			)
	}
}

class Shop extends React.Component {

	constructor(props) {
		super(props);
		this.products = [
			{category: "Sporting Goods", price: "49.99", stocked: true, name: "Football"},
			{category: "Sporting Goods", price: "9.99", stocked: true, name: "Baseball"},
			{category: "Sporting Goods", price: "29.99", stocked: false, name: "Basketball"},
			{category: "Electronics", price: "99.99", stocked: true, name: "iPod Touch"},
			{category: "Electronics", price: "399.99", stocked: false, name: "iPhone 5"},
			{category: "Electronics", price: "199.99", stocked: true, name: "Nexus 7"},
			{category: "Electronics", price: "99.99", stocked: true, name: "Samsung TV"},
			{category: "Electronics", price: "399.99", stocked: false, name: "iMac"},
			{category: "Electronics", price: "199.99", stocked: true, name: "HP Laptop"},
		];
	}
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-8">
				  		<ProductList products={this.products} />
				  	</div>
				  	<div class="col-4">
				  		<Cart products={this.products} />
				  	</div>
			  	</div>
		  	</div>
		  );
		}
	}


export default Shop;