import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Crypto from './components/Crypto';
import FinTech from './components/FinTech';
import Python from './components/Python';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
// a variable declared with const cannot be changed
// a variable declared with let can be changed

// but if a variable is an array or object
// its value can get altered

const Root = () =>
<Router basename="/techliner/">
	<div>

		<Navbar inverse className="navbar">
			<Navbar.Header>
				<Navbar.Brand>
					<Link to="/">Techliner</Link>
				</Navbar.Brand>

				<Navbar.Toggle/>
			</Navbar.Header>
			<Navbar.Collapse>
			<Nav>
				<NavItem>
					<NavLink exact to="/" activeClassName="active">Home</NavLink>
				</NavItem>
				<NavItem>
					<NavLink to="/crypto" activeClassName="active">Crypto</NavLink>
				</NavItem>
				<NavItem>
					<NavLink to="/fintech" activeClassName="active">FinTech</NavLink>
				</NavItem>
				<NavItem>
					<NavLink to="/python" activeClassName="active">Python</NavLink>
				</NavItem>
			</Nav>
			</Navbar.Collapse>
		</Navbar>

		<Route exact path="/" component= { App } />
		<Route exact path="/crypto" component= { Crypto } />
		<Route exact path="/fintech" component= { FinTech } />
		<Route exact path="/python" component= { Python } />
	</div>
</Router>

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
