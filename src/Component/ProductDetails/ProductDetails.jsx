import React, { Component } from "react";
import { getProductQuery } from "../../Queries/Queries";
import { graphql } from "react-apollo";

class ProductDetails extends Component {
  addToCart(e) {
    e.preventDefault();
    let prodArr = null;
    let { product } = this.props.data;
    if (product) {
      if (localStorage.getItem("productInfo") == null) {
        prodArr = [];
      } else {
        prodArr = JSON.parse(localStorage.getItem("productInfo"));
      }
      prodArr = prodArr.filter((e) => e.id !== product.id);
      prodArr.push(product);
      localStorage.setItem("productInfo", JSON.stringify(prodArr));
      // console.log(prodArr);
    }
  }

  removeFromCart(e) {
    e.preventDefault();
    let prodArr = null;
    let { product } = this.props.data;
    if (product) {
      if (localStorage.getItem("productInfo") == null) {
        prodArr = [];
      } else {
        prodArr = JSON.parse(localStorage.getItem("productInfo"));
      }
      prodArr = prodArr.filter((e) => e.id !== product.id);
      localStorage.setItem("productInfo", JSON.stringify(prodArr));
      // console.log(prodArr);
    }
  }

  displayProductDetails() {
    let { product } = this.props.data;
    if (product) {
      return (
        <>
          <form>
            <div className="attributes">
              {product.attributes.map((attribute, index) => {
                if (attribute.id === "Size") {
                  return (
                    <div key={index}>
                      Choose Size:
                      <br />
                      {attribute.items.map((item) => {
                        return (
                          <>
                            <label key={item.id} className="item">
                              {item.value}
                            </label>
                            <input
                              type="radio"
                              name="size"
                              value={item.value}
                            />
                          </>
                        );
                      })}{" "}
                    </div>
                  );
                } else if (attribute.id === "Capacity") {
                  return (
                    <div key={index}>
                      Choose Capacity:
                      <br />
                      {attribute.items.map((item) => {
                        return (
                          <>
                            <label key={item.id} className="item">
                              {item.value}
                            </label>
                            <input
                              type="radio"
                              name="capacity"
                              value={item.value}
                            />
                          </>
                        );
                      })}{" "}
                    </div>
                  );
                } else if (attribute.id === "Color") {
                  return (
                    <div key={index}>
                      Choose Color:
                      <br />
                      {attribute.items.map((item) => {
                        return (
                          <>
                            <label
                              key={item.id}
                              className="itemColor"
                              style={{ backgroundColor: item.value }}
                            ></label>
                            <input
                              type="radio"
                              name="color"
                              value={item.value}
                            />
                          </>
                        );
                      })}{" "}
                    </div>
                  );
                } else if (attribute.id === "With USB 3 ports") {
                  return (
                    <div key={index}>
                      Are you need product With USB 3 ports?
                      <br />
                      {attribute.items.map((item) => {
                        return (
                          <>
                            <label key={item.id} className="item">
                              {item.value}
                            </label>
                            <input type="radio" name="USB" value={item.value} />
                          </>
                        );
                      })}{" "}
                    </div>
                  );
                } else if (attribute.id === "Touch ID in keyboard") {
                  return (
                    <div key={index}>
                      Touch ID in keyboard?
                      <br />
                      {attribute.items.map((item) => {
                        return (
                          <>
                            <label key={item.id} className="item">
                              {item.value}
                            </label>
                            <input
                              type="radio"
                              name="keyboard"
                              value={item.value}
                            />
                          </>
                        );
                      })}{" "}
                    </div>
                  );
                }
              })}
            </div>
            <div className="Desc-cart">
              <button onClick={(e) => this.removeFromCart(e)} className="btnTwo">
                Remove From Cart
              </button>
              <button onClick={(e) => this.addToCart(e)} className="btn">
                Add To Cart
              </button>
            </div>
            <p className="clear"></p>
          </form>
          <div className="gallery">
            <div className="gallery-img">
              {product.gallery.map((image, index) => {
                return <img key={index} src={image} alt="" />;
              })}
            </div>
            <div className="gallery-one">
              <img src={product.gallery[0]} alt="main" />
            </div>
            <div className="Desc">
              <h3>{product.name}</h3>
              <p>Brand: {product.brand}</p>
              <p>{product.description.replace(/(<([^>]+)>)/gi, "")}</p>
              <div className="price">
                <p>
                  Price: {product.prices[0].amount}{" "}
                  <span>{product.prices[0].currency.symbol}</span>{" "}
                </p>
                <p>
                  {product.inStock ? (
                    <span className="available">Available</span>
                  ) : (
                    <span className="unavailable">OUT OF STOCK</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  render() {
    return (
      <>
        <h1>Product Details</h1>
        {this.displayProductDetails()}
      </>
    );
  }
}

export default graphql(getProductQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.match.params.id,
      },
    };
  },
})(ProductDetails);
