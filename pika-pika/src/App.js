import React from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import SignIn from "./components/Login"
import SignUp from "./components/Register"
import Dashboard from "./components/Dashboard"

//Redux

import { Provider } from 'react-redux';
import store from './store';
const App = () => (

	<Provider store={store}>
		<BrowserRouter>
			{/* <div className="App"> */}
				<Switch>
					<Route exact path="/" component={SignIn}>
					</Route>
					<Route  path="/register" component={SignUp}>
					</Route>
					<Route  path="/dashboard" component={Dashboard}>
					</Route>
				</Switch>
			{/* </div> */}
		</BrowserRouter>
	</Provider>

);

export default App;
