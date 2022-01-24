import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import style from "./MiniCart.module.css";

export default class MiniCart extends Component {
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

  displayToCart(symbol) {
    let prodArr = null;
    if (!localStorage.getItem("productInfo")) {
      prodArr = [];
    } else {
      prodArr = JSON.parse(localStorage.getItem("productInfo"));
      if (prodArr.length === 0) {
        return <p>No products Here</p>;
      } else {
        return prodArr.map((cartone, index) => {
          return (
            <>
              <div key={index} className={style.cartShow}>
                <div className={style.descProd}>
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
                  <div className={style.attributesCart}>
                    {cartone.attributes.map((attribute, index) => {
                      if (attribute.id === "Size") {
                        return (
                          <div key={index}>
                            Choose Size:
                            <br />
                            {attribute.items.map((item) => {
                              return (
                                <>
                                  <label key={item.id} className={style.item}>
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
                                  <label key={item.id} className={style.item}>
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
                                    className={style.itemColor}
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
                                  <label key={item.id} className={style.item}>
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
                                  <label key={item.id} className={style.item}>
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
                    Remove
                  </button>
                </div>
                <div className={style.numImg}>
                  <div className={style.numDiv}>
                    <label htmlFor="inputNm">Quantity</label>
                    <br />
                    <input id={style.inputNm} type="text" />
                  </div>
                  <div className={style.prodImage}>
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

  render() {
    return (
      <div id={style.mini}>
        <div id={style.miniCart}>
          {this.displayToCart(this.props.selected)}
          <div className={style.btnContanier}>
            {this.totalPrice()}
            <NavLink to="/bag">
              <button className={style.btnThr}>View Bag</button>
            </NavLink>
            <NavLink to="/checkout">
              <button className={style.btn}>Check Out</button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}
