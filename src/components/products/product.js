import React, { Component } from 'react';
import ProductList from './productList';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";

import PropTypes from 'prop-types';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
        products: [],
        categories: [],
        categorytoShow: props.location.pathname.split("/")[props.location.pathname.split("/").length-1]
    };
    this.setCategoryToShow = this.setCategoryToShow.bind(this);
}

setCategoryToShow(category) {
    this.setState({
        categorytoShow: category
   });
}

componentWillMount() {

  this.bindDataModel();
  
}

//Get the data from the api model.
bindDataModel()
{
  let url = 'https://api.myjson.com/bins/1duu4y';

  fetch(url).
  then(response => response.json()).
  then((productsList) => {

    // get unique items
    const uniqueItems = (x, i, array) => array.indexOf(x) === i;

    const categoriesArrays = productsList.map(prod => prod.categories).filter(uniqueItems);

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
      products: productsList,
      categories: categoriesDataSource,
    });
    });
}

render() {

  return (
    <section>
      <div class="content">
        <header>
          <h2>Filter products by category</h2>
        </header>
        {SetCategoryList(this.state.categories, this.setCategoryToShow, this.state.categorytoShow, this.state.products)}
      </div>
    </section>
      );
    }
}

const SetCategoryList = (categoriesList, setCategory, categorytoShow, products) => (

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

Product.propTypes = {
  products: PropTypes.element.isRequired,
  products: PropTypes.array,
  categories: PropTypes.element.isRequired,
  categories: PropTypes.element.string,// intentionally marked as an invalid type of property only to show test the error,
  categorytoShow: PropTypes.element.isRequired,
  categorytoShow: PropTypes.string
};