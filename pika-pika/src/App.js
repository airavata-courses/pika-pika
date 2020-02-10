import React from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import SignIn from "./components/login/Login"
import SignUp from "./components/Register"

//Redux

import { Provider } from 'react-redux';
import store from './store';
const App = () => (

	<Provider store={store}>
		<BrowserRouter>
			<div className="App">
				<Switch>

					<Route exact path="/" component={SignIn}>

					</Route>
					<Route exact path="/register" component={SignUp}>


					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>

);

export default App;
