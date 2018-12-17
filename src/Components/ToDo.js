import './ToDo.css';
import React from 'react';
import ReactDOM from 'react-dom';

// note: 'initData' will simulate the data that's passed from a backend/database to 'seed' the component
// It doesnt break the 'single source of truth' rule, as it's a constant (read only), 
// so while the state that seeds from it can be updated, this seed data can not mutate

const initData = [
	{id: 0, description: "Fix the washing machine", selected:false },
	{id: 1, description: "Get food for the dog", 	selected:false },
	{id: 2, description: "Trim the weeds",			selected:false },
	{id: 3, description: "Paint the fence", 		selected:false },
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
					  <span className="lable">
					   <span className="list-number">
					   {this.props.id+1}
					   </span>
					   {this.props.description}
					  </span>
					</label>
				</li>
			);
	}

}
class InputAddItem extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
				<div>
				<input
				type="text"
				value={this.props.value}
				onChange={this.props.onChange}
				/>
				<button 
				onClick={this.props.onClick}
				>
				Add To List
				</button>
				</div>
			);
	}
}

class ToDoList extends React.Component {

	constructor(props) {

		super(props);
		this.state = {
			items: initData, 
			itemToAdd: '',
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleClick(e) {

		// add item

		this.setState({
			//copy items (slice) and append (concat) the new object 
			items: this.state.items.slice().concat(
				[{
					id: this.state.items.length, 
					description: this.state.itemToAdd 
				}]
				),
			itemToAdd: '', // reset input value
		});
	}

	handleChange(e) {
		this.setState({itemToAdd: e.target.value});
	}

	render() {
		return(
			<div className="to-do-list">
				<Heading title="My To Do List" />
				<InputAddItem 
				value={this.state.itemToAdd} 
				onChange={this.handleChange}
				onClick={this.handleClick}
				/>
				<ul className="item-list">
				{this.state.items.map((item) => 
						<ItemRow 
						key={item.id}
						id={item.id}
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