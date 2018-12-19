import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // was bootstrap@4.1.3 last install
import './App.css';
import SearchableProductTable from './Components/SearchableProductTable';
import TicTacToe from './Components/TicTacToe';
import FreeCodeCamp from './Components/FreeCodeCamp';
import HelloWorld from './Components/HelloWorld';
import Api from './Components/Api';
import ToDo from './Components/ToDo';
import Calculator from './Components/Calculator';

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
 api : <Api />,
 toDo : <ToDo />,
 calculator : <Calculator />,
}

// set runApp to the appComponents key name above that you want to run

const runApp = "helloWorld";

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
