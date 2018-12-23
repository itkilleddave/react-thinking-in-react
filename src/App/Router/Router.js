import './Router.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
// an API that returns a player object
//import PlayerAPI from './PlayerAPI'

// note: I don't have the above PLayer API from the tutorial, so I'm just creating a data object to reference

const players = [
	{number:25, name: 'Steve Kerr'},
	{number:23, name: 'Michael Jordan'},
	{number:33, name: 'Scottie Pippen'},
	{number:91, name: 'Dennis Rodman'},
	{number:13, name: 'Luc Longley'},
]

const Header = () => (
	<header>
		<nav>
			<ul>
				<li><Link to='/'>Home</Link></li>
				<li><Link to='/roster'>Roster</Link></li>
				<li><Link to='/schedule'>Schedule</Link></li>
			</ul>
		</nav>
	</header>
)

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Home} />
			<Route path='/roster' component={Roster} />
			<Route path='/schedule' component={Schedule} />
		</Switch>
	</main>
)

const Roster = () => (
	<div>
	    <h2>This is a roster page!</h2>
		<Switch>
			<Route exact path='/roster' component={FullRoster} />
			<Route path='/roster/:number' component={Player} />
		</Switch>
	</div>
)

const Player = (props) => {

	const player = players.filter((p) => {
		return parseInt(props.match.params.number) === parseInt(p.number) ? true : false
	});
	if (!player) {
		return <div>Sorry, no player was found</div>
	}
	return (
		<div>
			<h1>{player[0].name} (#{player[0].number})</h1>
			<h2>{player[0].position}</h2>
		</div>
	)
}
const Schedule = () => (
  <div>
    <ul>
      <li>6/5 @ Houtson</li>
      <li>6/8 vs New York</li>
      <li>6/14 @ Boston</li>
    </ul>
  </div>
)
const Home = () => (
  <div>
    <h1>Welcome to the Chicago Bulls Website!</h1>
  </div>
)

const FullRoster = () => (
  <div>
    <ul>
      {
        players.map(p => (
          <li key={p.number}>
            <Link to={'/roster/'+p.number}>{p.name}</Link>
          </li>
        ))
      }
    </ul>
  </div>
)

class App extends React.Component {

	render() {
		return (
			<div>
				<Header />
				<Main />
			</div>
		)
	}
}

class Router extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<App />
			</BrowserRouter>
		)
	}
}


export default Router;