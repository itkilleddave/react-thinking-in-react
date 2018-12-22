import './Shop.css';
import React from 'react';

class Product extends React.Component {
	
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onClick(this.props.id);
	}

	render(){
	
		return(

			<div className="col-6">
				<div className="product">
					<h6 className="name">{this.props.name}</h6>
					<h6 className="price">${this.props.price}</h6>
					<p className="stock-status">
					{
					this.props.available
					? 
					(
						this.props.available===1
						?
						<div class="alert alert-warning" role="alert">
						Only {this.props.available} left!
						</div>
						:
						<div class="alert alert-info" role="alert">
						{this.props.available} in stock
						</div>
					)
					:
					<div class="alert alert-danger" role="alert">
					Out of stock
					</div>
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

	constructor(props) {
		super(props);
		this.handleClickRemove = this.handleClickRemove.bind(this);
	}

	handleClickRemove() {
		return this.props.onClickRemove(this.props.id);
	}

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
						<button 
						className="btn btn-sm btn-danger"
						onClick={this.handleClickRemove}
						>
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
class CartProductListTotals extends React.Component {

	render() {
		return(
			<div className="cart-product-list-totals">
				<div className="row">
					<div className="col-9">
						<h5>Total Items in Cart:</h5>
					</div>
					<div className="col-3 text-right">
						<h5>{this.props.quantity}</h5>
					</div>
					<div className="col-6">
						<h5>Total Price: </h5>
					</div>
					<div className="col-6 text-right">
						<h5>${Math.round((this.props.price)*100)/100}</h5>
					</div>
				</div>
			</div>	
			)
	}
}

class CartProductList extends React.Component {

	sumQuantity() {
		
		const products = this.props.products;
		let quantity = 0;

		for (var i = 0; i < products.length; i++) {
			quantity += parseInt(products[i].quantity);
		}

		return quantity;

	}
	sumPrice() {

		const products = this.props.products;
		let price = 0;

		for (var i = 0; i < products.length; i++) {
			price += parseFloat(products[i].price)*parseInt(products[i].quantity);
		}

		return price;

	}

	render(){

		//console.log(this.props.products);

		return(
			<div className="cart-product-list">
					
					<CartProductListHeader />

					{this.props.products.map((p) =>
						<CartProduct 
						key={p.id}
						id={p.id}
						name={p.name}
						price={p.price}
						quantity={p.quantity}
						onClickRemove={this.props.onClickRemoveProduct}
						/>
					)}

					<CartProductListTotals 
					quantity={this.sumQuantity()} 
					price={this.sumPrice()} 
					/>
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
				<CartProductList 
				products={this.props.products}
				onClickRemoveProduct={this.props.onClickRemoveProduct}
				/>
			</div>
			)
	}
}

class Shop extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			cartProducts:[
						{id: 7, quantity:2},
						{id: 6, quantity:3},
						{id: 2, quantity:1},
						],
		};
		this.handleClickProduct = this.handleClickProduct.bind(this);
		this.handleClickRemoveProductFromCart = this.handleClickRemoveProductFromCart.bind(this);
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

	handleClickRemoveProductFromCart(pid) {

		const cartProducts = this.state.cartProducts.filter((p) => {
			return p.id === pid ? false : true;
		});

		this.setState({
			cartProducts: cartProducts
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
			return cp;
		});

		// clones the objects fro props.products, but adds 'available' property (which considers products in cart)

		const shopProducts = this.props.products.map(p => {

			const sp = this.cloneObject(p);

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
				  		<Cart 
				  		products={cartProducts} 
				  		onClickRemoveProduct={this.handleClickRemoveProductFromCart}
				  		/>
				  	</div>
			  	</div>
		  	</div>
		  );
	}
}



export default Shop;