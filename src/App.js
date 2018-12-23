import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // was bootstrap@4.1.3 last install
import './App.css';
import SearchableProductTable from './App/SearchableProductTable/SearchableProductTable';
import TicTacToe from './App/TicTacToe/TicTacToe';
import FreeCodeCamp from './App/FreeCodeCamp/FreeCodeCamp';
import HelloWorld from './App/HelloWorld/HelloWorld';
import Api from './App/Api/Api';
import ToDo from './App/ToDo/ToDo';
import Calculator from './App/Calculator/Calculator';
import Shop from './App/Shop/Shop';
import Router from './App/Router/Router';

const products = [
  {category: "Sporting Goods", price: "49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "199.99", stocked: true, name: "Nexus 7"}
];

const shopProducts = [
{id:1, category: "Sporting Goods", price: "49.99", stocked: 3, name: "Football"},
{id:2, category: "Sporting Goods", price: "9.99", stocked: 4, name: "Baseball"},
{id:3, category: "Sporting Goods", price: "29.99", stocked: 1, name: "Basketball"},
{id:4, category: "Electronics",   price: "99.99", stocked: 7, name: "iPod Touch"},
{id:5, category: "Electronics",   price: "399.99", stocked: 0, name: "iPhone 5"},
{id:6, category: "Electronics",   price: "199.99", stocked: 23, name: "Nexus 7"},
{id:7, category: "Electronics",   price: "99.99", stocked: 5, name: "Samsung TV"},
{id:8, category: "Electronics",   price: "399.99", stocked: 5, name: "iMac"},
{id:9, category: "Electronics",   price: "199.99", stocked: 4, name: "HP Laptop"},
];

const app = {
 helloWorld : <HelloWorld />,
 searchableProductTable : <SearchableProductTable products={products} />,
 ticTacToe : <TicTacToe />,
 freeCodeCamp : <FreeCodeCamp />,
 api : <Api />,
 toDo : <ToDo />,
 calculator : <Calculator />,
 shop : <Shop products={shopProducts} />,
 router : <Router />,
}

// set runApp to the appApp key name above that you want to run

const runApp = "router";

class App extends Component {
  render() {
    return (
      <div className="App">
         {app[runApp]}
      </div>
    );
  }
}

export default App;
