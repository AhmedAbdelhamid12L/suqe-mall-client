import React, { Component } from "react";
import { getCategoriesQuery } from "../../Queries/Queries";
import { graphql } from "react-apollo";
import { NavLink } from "react-router-dom";

class All extends Component {
  displayProducts(symbol) {
    var data = this.props.data;
    // console.log(data);
    if (data.loading) {
      return <div>loading Products......</div>;
    } else {
      return data.categories.map((category) => {
        if (category.name === "all") {
          return category.products.map((product) => {
            return (
              <div className="oneProduct" key={product.id}>
                <div className="productImg">
                  <img src={product.gallery[0]} alt={product.brand} />
                </div>
                <div className="prodDesc">
                  <h3>{product.name}</h3>
                  <p>{product.brand}</p>
                  <div className="addToCart">
                    {symbol ? (
                      product.prices.map((pr, index) => {
                        if (pr.currency.symbol == symbol) {
                          return (
                            <p key={index}>
                              <span>{pr.amount}</span>
                              <span>{pr.currency.symbol}</span>
                            </p>
                          );
                        }
                      })
                    ) : (
                      <p>
                        {product.prices[0].amount}{" "}
                        <span>{product.prices[0].currency.symbol}</span>{" "}
                      </p>
                    )}
                    <p>
                      {product.inStock ? (
                        <span className="available">Available</span>
                      ) : (
                        <span className="unavailable">OUT OF STOCK</span>
                      )}
                    </p>
                  </div>
                  <NavLink to={"/all/" + product.id}>
                    <button className="btn"> Show Details</button>
                  </NavLink>
                </div>
                {product.inStock ? "" : <div className="instock"></div>}
              </div>
            );
          });
        }
      });
    }
  }
  render() {
    // console.log(this.props);
    return (
      <>
        <h1>All Our Products</h1>
        <div className="product">
          {this.displayProducts(this.props.selected)}
        </div>
      </>
    );
  }
}

export default graphql(getCategoriesQuery)(All);
