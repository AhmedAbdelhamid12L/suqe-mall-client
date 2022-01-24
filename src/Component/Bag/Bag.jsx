import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Bag extends Component {
  state = {
    prodArr: null,
  };

  removeFromCart(e, prodIndex) {
    e.preventDefault();
    let prodArr = this.state.prodArr;
    if (localStorage.getItem("productInfo") == null) {
      prodArr = [];
    } else {
      prodArr = JSON.parse(localStorage.getItem("productInfo"));
    }
    // console.log(prodIndex);
    prodArr.splice(prodIndex, 1);
    this.setState({ prodArr });
    localStorage.setItem("productInfo", JSON.stringify(prodArr));
    // console.log(prodArr);
  }

  totalPrice = () => {
    let prodArr = null;
    if (!localStorage.getItem("productInfo")) {
      prodArr = [];
    } else {
      prodArr = JSON.parse(localStorage.getItem("productInfo"));
    }
    let total = 0;
    total = prodArr.reduce((a, v) => (a = a + v.prices[0].amount), 0);
    return <>{total == 0 ? "" : <p>Total Price : {total} $</p>}</>;
  };

  displayToCart(symbol) {
    let prodArr = null;
    if (!localStorage.getItem("productInfo")) {
      prodArr = [];
    } else {
      prodArr = JSON.parse(localStorage.getItem("productInfo"));
      if (prodArr.length === 0) {
        return <p>No products have been added to the shopping cart</p>;
      } else {
        return prodArr.map((cartone, index) => {
          return (
            <>
              <div key={index} className="cartShow">
                <div className="desc-prod">
                  <div>
                    <h2>{cartone.name}</h2>
                    <p>{cartone.brand}</p>
                    {symbol ? (
                      cartone.prices.map((pr, index) => {
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
                        {cartone.prices[0].amount}{" "}
                        <span>{cartone.prices[0].currency.symbol}</span>{" "}
                      </p>
                    )}
                  </div>
                  <div className="attributesCart">
                    {cartone.attributes.map((attribute, index) => {
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
                                  <input
                                    type="radio"
                                    name="USB"
                                    value={item.value}
                                  />
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
                  <button
                    onClick={(e) => this.removeFromCart(e, index)}
                    className="btnTwo"
                  >
                    Remove From Cart
                  </button>
                </div>
                <div className="num-img">
                  <div className="num-div">
                    <label htmlFor="input-nm">
                      Type the quantity you want:
                    </label>
                    <br />
                    <input id="input-nm" type="text" />
                  </div>
                  <div className="prod-image">
                    <img src={cartone.gallery[0]} alt={cartone.brand} />
                  </div>
                </div>
              </div>
              <hr />
            </>
          );
        });
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Bag</h1>
        {this.displayToCart(this.props.selected)}
        <div>
          {this.totalPrice()}
          <div className="Desc-cart">
            <NavLink to="/checkout">
              <button className="btn">Check Out</button>
            </NavLink>
          </div>
          <p className="clear"></p>
        </div>
      </div>
    );
  }
}

export default Bag;

// onMouseMove={()=>this.totalPrice()}
