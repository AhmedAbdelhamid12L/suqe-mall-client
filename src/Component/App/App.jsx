import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//components
import Navbar from "../Navbar/Navbar";

//apollo client setup
const client = new ApolloClient({
  uri: "https://suqe-mall-server.herokuapp.com/",
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Navbar />
      </ApolloProvider>
    );
  }
}
