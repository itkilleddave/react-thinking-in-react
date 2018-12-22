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

		// const available = this.props.added !== this.props.stocked 
		// 				? (this.props.stocked-this.props.added) 
		// 				: false;

		// const stockMsg = available ? available+" in stock" : "out of stock";
			
		return(

			<div className="col-6">
				<div className="product">
					<h6 className="name">{this.props.name}</h6>
					<h6 className="price">${this.props.price}</h6>
					<p className="stock-status">
					{
					this.props.available 
					? 
					this.props.available+" in stock"
					:
					"out of stock"
					}
					</p>
			      	<button 
			      	className="btn btn-sm btn-primary"
			      	onClick={this.handleClick}
			      	disabled={!this.props.available}
			      	>
			      	Add
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
						available={p.available}
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
							${Math.round((this.props.quantity * this.props.price)*100)/100}
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
						<CartProduct 
						key={p.name}
						name={p.name}
						price={p.price}
						quantity={p.quantity}
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
		this.state = {
			cartProducts:[
						//{id: 7, quantity:2},
						//{id: 2, quantity:3},
						],
		};
		this.handleClickProduct = this.handleClickProduct.bind(this);
	}

	handleClickProduct(pid) {

		// calcualuate remaining stock in render function and pass to Shop Products

		const products = this.state.cartProducts.slice();

		let newProduct = true;

		for (var i = 0; i < products.length; i++) {
			const  cp  = products[i];
			if(cp.id === pid) {
				cp.quantity++
				newProduct = false; // is existing object.
			} 
		}
		
		const newProducts = newProduct ? products.concat({id: pid, quantity: 1}) : products;

		this.setState({
			cartProducts: newProducts
		});
	}

	cloneObject(src) {
		let target = {};
		for (let prop in src) {
			if (src.hasOwnProperty(prop)) {
			  target[prop] = src[prop];
			}
		}
		return target;
	}
	render() {

		//console.log(this.state);

		// returns list of any product objects matching shop (all) product ids against cart id
		// but adds the quantiity from cart products

		const cartProducts = this.state.cartProducts.map(cp => {

			for (var i = 0; i < this.props.products.length; i++) {
				const p = this.props.products[i];
				if (p.id === cp.id) {
					p.quantity = cp.quantity;
					return p;
				}
			}

		});

		// clones the objects fro props.products, but adds 'available' property (which considers products in cart)

		const shopProducts = this.props.products.map(p => {

			let sp = this.cloneObject(p);

			sp.available = p.stocked;

			for (var i = 0; i < cartProducts.length; i++) {
				const cp = cartProducts[i];
				if (p.id === cp.id) {
					sp.available = p.stocked - cp.quantity;
				}
			}	

			return sp;
		});

		return (
			<div className="container">
				<div className="row">
					<div className="col-6">
				  		<ProductList 
				  		products={shopProducts} 
				  		onClickProduct={this.handleClickProduct}
				  		/>
				  	</div>
				  	<div className="col-6">
				  		<Cart products={cartProducts} />
				  	</div>
			  	</div>
		  	</div>
		  );
	}
}



export default Shop;