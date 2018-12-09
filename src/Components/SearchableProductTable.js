import React, { Component } from 'react';

class SearchableProductTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    }
    this.handleOnChangeFilterText = this.handleOnChangeFilterText.bind(this);
    this.handleOnChangeInStockOnly = this.handleOnChangeInStockOnly.bind(this);
  }
  handleOnChangeFilterText(ft) {
    this.setState({filterText: ft});
  }
  handleOnChangeInStockOnly(iso) {
    this.setState({inStockOnly: iso});
  }
  render() {

    const filterText = this.state.filterText;
    const inStockOnly = this.state.inStockOnly;

    const products = this.props.products;
    const filteredProducts = products.filter(
      (item, index) => 
      (
      item.name.includes(filterText) 
      && 
      ((item.stocked && inStockOnly) || !inStockOnly)
      )
       ? item : false
      );

    return (
      <div>
        <SearchBar
        valueFilterText={filterText} 
        onChangeFilterText={this.handleOnChangeFilterText}
        valueInStockOnly={inStockOnly} 
        onChangeInStockOnly={this.handleOnChangeInStockOnly}
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
    this.handleOnChangeInStockOnly = this.handleOnChangeInStockOnly.bind(this);
  }
  handleOnChangeFilterText(e) {
    this.props.onChangeFilterText(e.target.value);
  }
  handleOnChangeInStockOnly(e) {
    this.props.onChangeInStockOnly(e.target.checked);
  }
  render() {
    return (
      <div>
      <input 
      type="text"
      className="search-field" 
      onChange={this.handleOnChangeFilterText}
      value={this.props.valueFilterText}
      />
      <br />
      <input 
      type="checkbox"
      onChange={this.handleOnChangeInStockOnly}
      checked={this.props.valueInStockOnly}
      />
      <span> In Stock Only</span>
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

export default SearchableProductTable;