import './ToDo.css';
import React from 'react';
import ReactDOM from 'react-dom';

const data = [
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
					<label class="container">
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
			items: this.props.data,
		};
	}

	render() {
		return(
			<div className="to-do-list">
				<Heading title="My To Do List" />
				<ul className="item-list">
				{this.state.items.map((item) => 
						<ItemRow 
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
      <ToDoList data={data} />
      );
  }
}


export default ToDo;