import React, { Component } from "react";
import { NavLink, Redirect, Switch, Route } from "react-router-dom";
import style from "./Navbar.module.css";
import cartImage from "../../Images/cart.png";
import bagImage from "../../Images/bag.png";
import { getCurrenciesQuery } from "../../Queries/Queries";
import { graphql } from "react-apollo";

//components
import All from "../All/All";
import Clothes from "../Clothes/Clothes";
import Tech from "../Tech/Tech";
import Notfound from "../Notfound/Notfound";
import ProductDetails from "../ProductDetails/ProductDetails";
import Bag from "../Bag/Bag";
import CheckOut from "../CheckOut/CheckOut";
import MiniCart from "../MiniCart/MiniCart";

class Navbar extends Component {
state = {
    selected: "",
    showMiniCart: false,
    nuProd: 0,
  };



  setCurren(symbol) {
    let selected = this.state.selected;
    selected = symbol;
    this.setState({ selected });
    // console.log(selected);
  }

  displayCurrencies() {
    var data = this.props.data;
    // console.log(data);
    if (data.loading) {
      return <option disabled>loading Currencies......</option>;
    } else {
      return data.currencies.map((currency) => {
        return (
          <option
            key={currency.label}
            className={style.option}
            value={currency.symbol}
          >
            {currency.symbol} {currency.label}
          </option>
        );
      });
    }
  }

  displayMiniCart() {
    this.setState({ showMiniCart: !this.state.showMiniCart });
  }

  setProdNu=()=> {
    let prodArr = null;
    if (!localStorage.getItem("productInfo")) {
      prodArr = [];
    } else {
      prodArr = JSON.parse(localStorage.getItem("productInfo"));
    }
    let nuProd = this.state.nuProd
    nuProd = prodArr.length;
    this.setState({nuProd})
  } 

  render() {
    return (
      <div onMouseMove={()=> this.setProdNu()}>
        <nav className={style.Nav}>
          <ul>
            <li>
              <NavLink activeClassName={style.active} to="/all">
                All
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={style.active} to="/clothes">
                Clothes
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={style.active} to="/tech">
                Tech
              </NavLink>
            </li>
          </ul>
          <ul>
            <NavLink to="/bag">
              <img
                title="My Cart"
                className={style.bagImage}
                src={bagImage}
                alt="bag"
              />
            </NavLink>
          </ul>
          <ul>
            <li>
              <select onChange={(e) => this.setCurren(e.target.value)}>
                {this.displayCurrencies()}
              </select>
            </li>
            <li className={style.arrCon} onClick={() => this.displayMiniCart()}>
              <img title="Mini Cart" src={cartImage} alt="Cart" />
              {this.state.nuProd > 0 ? <div className={style.arrNu}>{this.state.nuProd}</div>:''}
            </li>
          </ul>
        </nav>
        <div className="app">
          <Switch>
            <Redirect exact from="/" to="/all" />
            <Route
              path="/all"
              exact
              render={(props) => <All selected={this.state.selected} />}
            />
            <Route
              path="/clothes"
              exact
              render={(props) => <Clothes selected={this.state.selected} />}
            />
            <Route
              path="/tech"
              exact
              render={(props) => <Tech selected={this.state.selected} />}
            />
            <Route path="/all/:id" exact component={ProductDetails} />
            <Route path="/clothes/:id" exact component={ProductDetails} />
            <Route path="/tech/:id" exact component={ProductDetails} />
            <Route
              path="/bag"
              exact
              render={(props) => <Bag selected={this.state.selected} />}
            />
            <Route path="/checkout" exact component={CheckOut} />
            <Route path="*" component={Notfound} />
          </Switch>
        </div>
        {this.state.showMiniCart ? (
          <MiniCart selected={this.state.selected} />
        ) : null}
      </div>
    );
  }
}

export default graphql(getCurrenciesQuery)(Navbar);
