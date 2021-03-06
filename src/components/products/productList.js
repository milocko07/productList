import React, { Component } from 'react';

/**
 * Handle the visualization of the products list filtered by a category.
 **/
export default class ProductList extends React.Component {

/**
 * Defines the initial props and states of the component.
 **/
constructor(props) {
    super(props);
    this.state = {
        products: props.products,
        categories: props.categories,
        categorytoShow: props.match.params.id == "" ? "All" : props.match.params.id
    };       
}

/**
 * Secures that all the states will be set correctly.
 **/
componentWillReceiveProps(nextProps) {       
    this.setState({ categorytoShow: nextProps.categorytoShow, products: nextProps.products, categories: nextProps.categories });
}

/**
 * Lets to render the product list information.
 **/
render() {

    // Gets the list of products filtered by a category.
    var listProductsFiltered = this.state.products.filter(item =>
    this.state.categories.filter(c => c === this.state.categorytoShow) 
                        .map(val => item.categories.indexOf(val))
                        .map(val => (val > -1 ? true : false))
                        .reduce((acc, cum) => acc && cum)
                        || this.state.categorytoShow === "All"
    )
    .map(({ id, name, description, photo, stock, price }) => (
    <RenderProduct key={`ProductItems-${name}`} id={id} name={name} description={description} photo={photo} stock={stock} price={price} />
    ));

    var totalProductsFiltered = listProductsFiltered.length; 
    var totalHiddenProducts = this.state.products.length - listProductsFiltered.length;

    // ToDo: Refactor this to avoid code duplication.
    if (this.state.categorytoShow !== "All") 
    {
        return (
            <section>
                <p> Showing <b>{totalProductsFiltered}</b> products - hidden <b>{totalHiddenProducts}</b> </p>
                <hr class="major" />
                {listProductsFiltered}
            </section>
        );
    }
    else
    {
        return (
            <section>
                <hr class="major" />
                {listProductsFiltered}
            </section>
        );
    }
}

}

/**
 * Renders the information of each product item.
 **/
const RenderProduct = ({ id, name, description, photo, stock, price }) => (
    
    <div>
      <span class="image main"><img id={id} class="image main" src={photo} alt=""/></span>  
        <p>
        <b>{name}</b>: {description}
        </p>
        <p>
        <b>Stock</b>: {stock}
        </p>
        <p>
        <b>Price</b>: ${price}
        </p>

      <hr class="major" />
    </div>
);
