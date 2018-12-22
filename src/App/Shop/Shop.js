import './Shop.css';
import React from 'react';
import ReactDOM from 'react-dom';


class Product extends React.Component {
	
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onClick(this.props.id);
	}

	render(){

		const available = this.props.added !== this.props.stocked 
						? (this.props.stocked-this.props.added) 
						: false;

		const stockMsg = available ? available+" in stock" : "out of stock";
			
		return(

			<div className="col-6">
				<div className="product">
					<h6 className="name">{this.props.name}</h6>
					<h6 className="price">${this.props.price}</h6>
					<p className="stock-status">
					{stockMsg}
					</p>
			      	<button 
			      	className="btn btn-sm btn-primary"
			      	onClick={this.handleClick}
			      	disabled={!available}
			      	>
			      	{available ? "Add" : "Out of Stock"}
			      	</button>
		      	</div>
	      	</div>
		)
	}

}

class ProductList extends React.Component {

	constructor(props) {
		super(props);
		this.handleClickProduct = this.handleClickProduct.bind(this);
	}

	handleClickProduct(pid) {
		
		this.props.onClickProduct(pid);

	}

	render(){
		return(
			<div className="product-list">
				<div className="row">
					{this.props.products.map((p) => 
						<Product 
						key={p.name}
						id={p.id}
						name={p.name}
						price={p.price}
						added={p.added}
						stocked={p.stocked}
						onClick={this.handleClickProduct}
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
					<div className="col-2 quantity">
							{this.props.quantity}
					</div>
					<div className="col-4 name">
							{this.props.name}
					</div>
					<div className="col-4 price">
							${this.props.price}
					</div>
					<div className="col-2 remove">
						<button className="btn btn-sm btn-danger">
						+
						</button>
					</div>
				</div>
			</div>
			)
	}
}
class CartProductListHeader extends React.Component {

	render() {
		return(
			<div className="cart-product-list-header">
				<div className="row">
					<div className="col-2 quantity">
							Qty
					</div>
					<div className="col-4 name">
							Product
					</div>
					<div className="col-4 price">
							Price
					</div>
					<div className="col-2 remove">

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
					
					<CartProductListHeader />

					{this.props.products.map((p) =>
						p.added 
						? 
						<CartProduct 
						key={p.name}
						name={p.name}
						price={Math.round((p.added * p.price)*100)/100}
						quantity={p.added}
						/>
						:
						false
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
		this.state = {
			products: [
			{id:1, added:0, category: "Sporting Goods", price: "49.99", stocked: 3, name: "Football"},
			{id:2, added:0, category: "Sporting Goods", price: "9.99", stocked: 4, name: "Baseball"},
			{id:3, added:0, category: "Sporting Goods", price: "29.99", stocked: 11, name: "Basketball"},
			{id:4, added:0, category: "Electronics", 	price: "99.99", stocked: 3, name: "iPod Touch"},
			{id:5, added:0, category: "Electronics", 	price: "399.99", stocked: 0, name: "iPhone 5"},
			{id:6, added:0, category: "Electronics", 	price: "199.99", stocked: 23, name: "Nexus 7"},
			{id:7, added:0, category: "Electronics", 	price: "99.99", stocked: 2, name: "Samsung TV"},
			{id:8, added:0, category: "Electronics", 	price: "399.99", stocked: 5, name: "iMac"},
			{id:9, added:0, category: "Electronics", 	price: "199.99", stocked: 4, name: "HP Laptop"},
			],
		};
		this.handleClickProduct = this.handleClickProduct.bind(this);
	}

	handleClickProduct(pid) {

		const newProductState = this.state.products.map((p) => {

			if (p.id === pid) {
				
				p.added++;
			} 
			return p;
		});

		this.setState({products: newProductState});
	}

	render() {
		//console.log(this.state.products);
		return (
			<div className="container">
				<div className="row">
					<div className="col-6">
				  		<ProductList 
				  		products={this.state.products} 
				  		onClickProduct={this.handleClickProduct}
				  		/>
				  	</div>
				  	<div className="col-6">
				  		<Cart products={this.state.products} />
				  	</div>
			  	</div>
		  	</div>
		  );
	}
}



export default Shop;