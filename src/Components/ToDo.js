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
					   {this.props.id}
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
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(e) {
		this.setState({value: e.target.value});
	}
	handleClick() {
		this.props.onClick(this.state.value);
		this.setState({value: ''}); // reset text field
	}

	render() {
		return(
				<div>
				<input
				type="text"
				value={this.state.value}
				onChange={this.handleChange}
				/>
				<button 
				onClick={this.handleClick}
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
		};

		// InputAddItem
		this.handleClick = this.handleClick.bind(this);

		// button (remove)
		this.handleClickRemove = this.handleClickRemove.bind(this);

		//ItemRow
		this.handleChangeItem = this.handleChangeItem.bind(this);
	}

	highestId() {

		let highestId = 0;

		for (var i = 0; i < this.state.items.length; i++) {
			highestId = (this.state.items[i].id > highestId) ? this.state.items[i].id : highestId;
		}
		return highestId;
	}

	handleClick(value) {

		if (value) {

			//console.log(e.target.value);

			// add item

			this.setState({
				//copy items (slice) and append (concat) the new object 
				items: this.state.items.slice().concat(
					[{
						id: this.highestId()+1, 
						description: value,
						checked: false, 
					}]
					),
			});
		}
	}

	handleChangeItem(e) { 

		//console.log(e.target.id);

		const newItems = this.state.items.map((item) => 
			(item.id === parseInt(e.target.id))
			? { // replace the item matching id with updated checked value
				id: item.id, 
				description: item.description,
				checked: e.target.checked, 
			}
			: item);

		//console.log(newItems);
		//console.log(this.state.items);

		this.setState({
			items: newItems
		});
	}

	handleClickRemove(e) {

		//console.log(e.target.id);

		const newItems = this.state.items.filter((item) => {
			return item.checked ? false : true;
		});

		this.setState({
			items: newItems
		});
	}

	render() {
		console.log(this.state.items);
		return(
			<div className="to-do-list">
				
				<Heading title="My To Do List" />

				<div className="ui-bar">
					<InputAddItem 
					onClick={this.handleClick}
					/>
					<button 
					onClick={this.handleClickRemove}
					>
					Remove Selected
					</button>
				</div>

				<ul className="item-list">
				{this.state.items.map((item) => 
						<ItemRow 
						key={item.id}
						id={item.id}
						description={item.description} //JSON.stringify(item)
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