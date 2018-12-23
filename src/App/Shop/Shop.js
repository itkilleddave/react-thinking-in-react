import './Shop.css';
import React from 'react';

class Product extends React.Component {
	
	constructor(props) {
		super(props);
		this.handleClickAdd = this.handleClickAdd.bind(this);
		this.handleClickRemove = this.handleClickRemove.bind(this);
	}

	handleClickAdd() {
		this.props.onClickAdd(this.props.id);
	}

	handleClickRemove() {
		this.props.onClickRemove(this.props.id);
	}

	render(){
		
		//console.log(this.props.inCart);

		return(

			<div className="col-6 col-sm-4 col-md-6 col-lg-4 col-xl-3">
				<div className="product">
					<h6 className="name">{this.props.name}</h6>
					<h6 className="price">${this.props.price}</h6>
					<div className="stock-status">
					{
						this.props.available
						? 
						(
							this.props.available===1
							?
							<div className="alert alert-warning" role="alert">
							Only {this.props.available} left!
							</div>
							:
							<div className="alert alert-info" role="alert">
							{this.props.available} in stock
							</div>
						)
						:
						<div className="alert alert-danger" role="alert">
						Out of stock
						</div>
					}
					</div>
					{
						this.props.inCart
						? // - / + button
						<div className="btn-group btn-group-sm" role="group">
							<button 
							type="button" 
							className="btn btn-primary"
							onClick={this.handleClickRemove}
							>
							-
							</button>

							<div className="cart-status">{this.props.inCart} in<br />Cart</div>
							
							<button 
							type="button" 
							className="btn btn-primary"
							onClick={this.handleClickAdd}
							disabled={!this.props.available}
							>
							+
							</button>
						</div>
						: // 'Add to Cart' button
				      	<button 
						type="button"
				      	className="btn btn-sm btn-primary"
				      	onClick={this.handleClickAdd}
				      	disabled={!this.props.available}
				      	>
				      	Add to Cart
				      	</button>
			      	}
		      	</div>
	      	</div>
		)
	}

}

class ProductList extends React.Component {

	constructor(props) {
		super(props);
		this.handleClickAddProduct = this.handleClickAddProduct.bind(this);
		this.handleClickRemoveProduct = this.handleClickRemoveProduct.bind(this);

	}

	handleClickAddProduct(pid) {
		this.props.onClickAddProduct(pid, 1);
	}

	handleClickRemoveProduct(pid) {
		this.props.onClickRemoveProduct(pid, 1);
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
						inCart={p.inCart}
						onClickAdd={this.handleClickAddProduct}
						onClickRemove={this.handleClickRemoveProduct}
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
		return this.props.onClickRemove(this.props.id, this.props.quantity);
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
		this.handleClickAddProductToCart = this.handleClickAddProductToCart.bind(this);
		this.handleClickRemoveProductFromCart = this.handleClickRemoveProductFromCart.bind(this);
	}

	handleClickAddProductToCart(pid, qty) {

		// calcualuate remaining stock in render function and pass to Shop Products

		const products = this.state.cartProducts.slice();

		let newProduct = true;

		for (var i = 0; i < products.length; i++) {
			const  p  = products[i];
			if(p.id === pid) {
				p.quantity += qty;
				newProduct = false; // is existing object.
			} 
		}
		
		const newProducts = newProduct ? products.concat({id: pid, quantity: 1}) : products;

		this.setState({
			cartProducts: newProducts
		});
	}

	handleClickRemoveProductFromCart(pid, qty) {

		console.log([pid, qty]);

		const products = this.state.cartProducts.slice();

		for (var i = 0; i < products.length; i++) {
			const  p  = products[i];
			if(p.id === pid) {
				p.quantity -= qty;
				break;
			} 
		}

		// remove the product if no quantity

		const filteredProducts = products.filter((p) => {
			return p.quantity > 0 ? true : false;
		});

		this.setState({
			cartProducts: filteredProducts
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
			sp.inCart = 0;

			for (var i = 0; i < cartProducts.length; i++) {
				const cp = cartProducts[i];
				if (p.id === cp.id) {
					sp.available = p.stocked - cp.quantity;
					sp.inCart = cp.quantity;
				}
			}	

			return sp;
		});

		return (
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-6 col-xl-8">
				  		<ProductList 
				  		products={shopProducts} 
				  		onClickAddProduct={this.handleClickAddProductToCart}
				  		onClickRemoveProduct={this.handleClickRemoveProductFromCart}
				  		/>
				  	</div>
				  	<div className="col-12 col-md-6 col-xl-4">
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