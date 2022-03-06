import Head from "next/head";
import { Component } from "react";
import Nav from "../nav";
import classes from "./layout.module.css";
export default class Layout extends Component {
  render() {
    return (
      <div className={classes.container}>
        <Head>
          <meta name="viewport" content="width=device-width,intial-scale=1.0" />
        </Head>
        <Nav />
        {this.props.children}
      </div>
    );
  }
}
