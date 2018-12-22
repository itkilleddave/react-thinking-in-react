import './Api.css';
import React from 'react';

class Background extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			pictures: [],
		};
	}
	componentWillMount() {

		fetch('https://randomuser.me/api/?results=100')
		.then(results => {
			return results.json();
		})
		.then(data =>{
			let pictures = data.results.map((pic) => {
				return (
					<div key={pic.cell}> {/*changed from 'pic.results' (tutorial) to 'pic.cell' (currently available in Api)*/}
						<img alt="" src={pic.picture.medium} />
					</div>
				)
			})
			this.setState({pictures: pictures});
			console.log("state", this.state.pictures);
			//console.log("state", data.results);
		})
	}

	render() {
	return(
		<div className="container2">
			<div className="container1">
				{this.state.pictures}
			</div>
		</div>
		);
	}
}


class Api extends React.Component {
  render() {
    return (
      <Background />
      );
  }
}


export default Api;