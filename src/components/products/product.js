import React, { Component } from 'react';
import ProductList from './productList';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";

import PropTypes from 'prop-types';

/**
 * Handle the products list by category.
 **/
export default class Product extends Component {

/**
 * Defines the initial props and states of the component.
 **/
constructor(props) {
  super(props);
  this.state = {
      products: [],
      categories: [],
      categorytoShow: props.location.pathname.split("/")[props.location.pathname.split("/").length-1]
  };

  this.setCategoryToShow = this.setCategoryToShow.bind(this);
}

/**
 * Delagate to set the category name when its clicked its event.
 **/
setCategoryToShow(category) {
    this.setState({
        categorytoShow: category
   });
}

  /**
   * When the component will be mounted, its good to call the data that is neeeded trough an api.
   **/
  componentWillMount() {
    this.bindDataModel();
  }

  /**
   * Gets the data from the api model.
   **/
  bindDataModel()
  {
    let url = 'https://api.myjson.com/bins/1duu4y';

    fetch(url).
    then(response => response.json()).
    then((productsDataSource) => {
      this.setDataModel(productsDataSource);
    });
  }

  /**
   * Sets the information returned from the api and that is needed to render the categories and products.
   **/
  setDataModel(productsDataSource)
  {
    // delagate to get unique items.
    const uniqueItems = (x, i, array) => array.indexOf(x) === i;

    const categoriesArrays = productsDataSource.map(prod => prod.categories).filter(uniqueItems);

    var categoriesDataSource = new Array();

    for(var i=0;i<categoriesArrays.length;i++)
    {
      for(var j=0;j<categoriesArrays[i].length;j++)
      {
      categoriesDataSource.push(categoriesArrays[i][j]);
      }
    }

    categoriesDataSource.push("All");
    categoriesDataSource = categoriesDataSource.sort().filter(uniqueItems);

    this.setState({
      products: productsDataSource,
      categories: categoriesDataSource
    });
  }

  /**
   * Lets to render the categories list.
   **/
  render() {
    return (
      <section>
        <div class="content">
          <header>
            <h2>Filter products by category</h2>
          </header>
          {SetCategoryListNavigation(this.state.categories, this.setCategoryToShow, this.state.categorytoShow, this.state.products)}
        </div>
      </section>
      );
  }
}

/**
 * Sets dynamically the categories list and their navigation with products list.
 **/
const SetCategoryListNavigation = (categoriesList, setCategory, categorytoShow, products) => (
  <Router >
    <div>
      <ul class="actions">
      {
          categoriesList.map((category) => (
          <li>
            <Link to={`/products/${category}`} class="button big" onClick={() => setCategory(category)}>{category}</Link>
          </li>
      ))}

      </ul>
      <Route
            path='/products/:id'
            render={(props) => <ProductList {...props} categorytoShow={categorytoShow} products={products} categories={categoriesList} />}
      />
    </div>
  </Router>
);

/**
 * Sets the validators for each component prop.
 **/
Product.propTypes = {
  products: PropTypes.element.isRequired,
  products: PropTypes.array,
  categories: PropTypes.element.isRequired,
  categories: PropTypes.element.string,// intentionally marked as an invalid type of property only to show test the error,
  categorytoShow: PropTypes.element.isRequired,
  categorytoShow: PropTypes.string
};