import React, { Component } from 'react';

export default class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: props.products,
            categories: props.categories,
            categorytoShow: props.match.params.id == "" ? "All" : props.match.params.id
        };       
    }

    componentWillReceiveProps(nextProps) {       
        this.setState({ categorytoShow: nextProps.categorytoShow, products: nextProps.products, categories: nextProps.categories });
    }

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

const RenderProduct = ({ id, name, description, photo, stock, price }) => (
    
    <div>
      <span class="image main"><img class="image main" src={photo} alt=""/></span>  
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
