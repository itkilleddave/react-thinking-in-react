import './ToDo.css';
import React from 'react';
import ReactDOM from 'react-dom';

// note: 'initData' will simulate the data that's passed from a backend/database to 'seed' the component
// It doesnt break the 'single source of truth' rule, as it's a constant (read only), 
// so while the state that seeds from it can be updated, this seed data can not mutate

const initData = [
	{id: 0, description: "Fix the washing machine" },
	{id: 1, description: "Get food for the dog" },
	{id: 2, description: "Trim the weeds" },
	{id: 3, description: "Paint the fence" },
];

function Heading(props) {
	return <h1>{props.title}</h1>;
}
class ItemRow extends React.Component {

	render() {
		return(
				<li>
					<label className="container">
					  <input type="checkbox" checked={this.props.checked} />
					  <span className="lable">{this.props.description}</span>
					</label>
				</li>
			);
	}

}

class ToDoList extends React.Component {

	constructor(props) {

		super(props);
		this.state = {
			items: initData, 
		};
	}

	render() {
		return(
			<div className="to-do-list">
				<Heading title="My To Do List" />
				<ul className="item-list">
				{this.state.items.map((item) => 
						<ItemRow 
						key={item.id}
						description={item.description} 
						checked={item.checked} 
						/>
					)}
				</ul>
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