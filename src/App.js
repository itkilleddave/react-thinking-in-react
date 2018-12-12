import React, { Component } from 'react';
import './App.css';
import SearchableProductTable from './Components/SearchableProductTable';
import TicTacToe from './Components/TicTacToe';
import FreeCodeCamp from './Components/FreeCodeCamp';
import HelloWorld from './Components/HelloWorld';

const data = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

const appComponents = {
 helloWorld : <HelloWorld />,
 searchableProductTable : <SearchableProductTable products={data} />,
 ticTacToe : <TicTacToe />,
 freeCodeCamp : <FreeCodeCamp />,
}

// set runApp to the appComponents key name above that you want to run

const runApp = "freeCodeCamp";

class App extends Component {
  render() {
    return (
      <div className="App">
         {appComponents[runApp]}
      </div>
    );
  }
}

export default App;
