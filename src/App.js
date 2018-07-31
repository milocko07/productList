import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/home';
import Product from './components/products/product';
import Client from './components/client';
import Contact from './components/contact';

/**
 * Enter point of the application.
 **/
class App extends Component {

render() {
  return ( 
  <div id="wrapper">
      <div id="main">
          <div class="inner">
          <Navigation />
          </div>
      </div>
      <footer>
        Version 1.4.2
      </footer>
  </div>
  );
  }
}

/**
* Set the menu of the application.
**/
const Navigation = () => (
<Router>
  <div>
    <nav id="menu">
      <header >
        <h2>Products Project</h2> 
          <ul class="actions">
            <li><Link to={'/'}> Home </Link></li>
            <li><Link to={'/products/All'}>PRODUCTS</Link></li>
            <li><Link to={'/client'}>CLIENTS</Link></li>
            <li><Link to={'/contact'}>CONTACT</Link></li>
          </ul>
      </header>
    </nav>
    <hr />
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/products' component={Product} />
        <Route path='/client' component={Client} />
        <Route exact path='/contact' component={Contact} />
    </Switch>
  </div>
</Router>
);

export default App;