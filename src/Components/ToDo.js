import './ToDo.css';
import React from 'react';
import ReactDOM from 'react-dom';

function Heading() {
	return <h1>My To Do List</h1>;
}
class ItemRow extends React.Component {

	render() {
		return(
				<li>
					<label class="container">
					  <input type="checkbox" />
					  <span className="lable">One</span>
					</label>
				</li>
			);
	}

}
class ItemList extends React.Component {

	render() {
		return(
			<ul className="item-list">
				<ItemRow />
				<ItemRow />
				<ItemRow />
				<ItemRow />
			</ul>
			);
	}
}

class ToDoList extends React.Component {

	render() {
		return(
			<div className="to-do-list">
			<Heading />
			<ItemList />
			</div>
			);
	}
}

class ToDo extends React.Component {
  render() {
    return (
      <ToDoList />
      );
  }
}


export default ToDo;