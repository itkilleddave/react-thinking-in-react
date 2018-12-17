import './ToDo.css';
import React from 'react';
import ReactDOM from 'react-dom';

// note: 'initData' will simulate the data that's passed from a backend/database to 'seed' the component
// It doesnt break the 'single source of truth' rule, as it's a constant (read only), 
// so while the state that seeds from it can be updated, this seed data can not mutate

const initData = [
	{id: 0, description: "Fix the washing machine", checked:false },
	{id: 1, description: "Get food for the dog", 	checked:false },
	{id: 2, description: "Trim the weeds",			checked:true },
	{id: 3, description: "Paint the fence", 		checked:false },
];

function Heading(props) {
	return <h1>{props.title}</h1>;
}
class ItemRow extends React.Component {

	render() {
		return(
				<li>
					<label className="container">
					  <input 
					  type="checkbox" 
					  id={this.props.id}
					  checked={this.props.checked} 
					  onChange={this.props.onChange}
					  />
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
		this.state = {
			value: '',
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({value: e.target.value});
	}
	// handleClick(e) {

	// }

	render() {
		return(
				<div>
				<input
				type="text"
				value={this.state.value}
				onChange={this.handleChange}
				/>
				<button 
				value={this.state.value}
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

		// InputAddItem
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);

		//ItemRow
		//this.handleChangeItem = this.handleChangeItem.bind(this);
	}

	handleClick(e) {

		if (e.target.value !== '') {

			//console.log(e.target.value);

			// add item

			this.setState({
				//copy items (slice) and append (concat) the new object 
				items: this.state.items.slice().concat(
					[{
						id: this.state.items.length, 
						description: e.target.value,
						value: false, 
					}]
					),
				itemToAdd: '', // reset input value
			});
		}
	}

	handleChange(e) {
		this.setState({itemToAdd: e.target.value});
	}

	// NOTE: Come back to this after the input file is not re-rendering on change 

	// handleChangeItem(e) { 

	// 	//console.log(e.target.id);

	// 	const newItems = this.state.items.map((item) => 
	// 		(item.id === parseInt(e.target.id))
	// 		? { // replace the item matching id with updated checked value
	// 			id: item.id, 
	// 			description: item.description,
	// 			checked: e.target.checked, 
	// 		}
	// 		: item);

	// 	//console.log(newItems);
	// 	//console.log(this.state.items);

	// 	this.setState({
	// 		items: newItems
	// 	});
	// }

	render() {
		console.log(this.state.items);
		return(
			<div className="to-do-list">
				<Heading title="My To Do List" />
				<InputAddItem 
				//value={this.state.itemToAdd} 
				//onChange={this.handleChange}
				onClick={this.handleClick}
				/>
				<ul className="item-list">
				{this.state.items.map((item) => 
						<ItemRow 
						key={item.id}
						id={item.id}
						description={item.description} 
						checked={item.checked} 
						onChange={this.handleChangeItem}
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