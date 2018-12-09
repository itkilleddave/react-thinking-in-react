import React, { Component } from 'react';
import './App.css';

const data = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

class SearchableProductTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ''
    }
    this.handleOnChangeFilterText = this.handleOnChangeFilterText.bind(this);
  }
  handleOnChangeFilterText(ft) {
    this.setState({filterText: ft});
  }
  render() {

    const filterText = this.state.filterText;
    const products = this.props.products;
    const filteredProducts = products.filter(
      (item, index) => (item.name.includes(filterText)) ? item : null
      );

    return (
      <div>
        <SearchBar
        valueFilterText={filterText} 
        onChangeFilterText={this.handleOnChangeFilterText}
        />
        <ProductTable products={filteredProducts} />
      </div>
      );
  }
}
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleOnChangeFilterText = this.handleOnChangeFilterText.bind(this);
  }
  handleOnChangeFilterText(e) {
    this.props.onChangeFilterText(e.target.value);
  }
  render() {
    return (
      <div>
      <input 
      className="search-field" 
      onChange={this.handleOnChangeFilterText}
      value={this.props.valueFilterText}
      />
      </div>
      );
  }
}
class ProductTable extends Component {

  render() {

    // build product markup

    const products = this.props.products;
    const productMarkup = [];
    let category='';

    for (var i = products.length - 1; i >= 0; i--) {

      if (products[i]['category'] !== category) {
        category = products[i]['category'];
        productMarkup.push(
          <ProductCategoryRow 
          key={category} 
          name={category} 
          />
          );
      }
      productMarkup.push(
        <ProductRow 
        key={products[i]['name']} 
        name={products[i]['name']} 
        price={products[i]['price']} 
        stocked={products[i]['stocked']} 
        />
        );
    }

    // return markup

    return (
      <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        {productMarkup}
        </tbody>
      </table>
      );
  }
}

class ProductRow extends Component {

  render() {
    return (
      <tr className={!this.props.stocked ? 'not-stocked' : ''}>
      <td>{this.props.name}</td>
      <td>{this.props.price}</td>
      </tr>
      );
  }
}

class ProductCategoryRow extends Component {

  render() {
    return (
      <tr className="product-category">
      <td colSpan="2">{this.props.name}</td>
      </tr>);
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchableProductTable products={data} />
      </div>
    );
  }
}

export default App;
