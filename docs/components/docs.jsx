import Ecology from "ecology";
import ga from "react-ga";
import { Link } from "react-router";
import Radium, { Style } from "radium";
import React from "react";
import ReactDOM from "react-dom";

import { components, routing as routingConfig } from "../config";
import { VictoryTheme, Header, Footer } from "formidable-landers";
import * as Victory from "../../src/index";
const { VictoryChart, VictoryLine, VictoryPie } = Victory;
const V = Victory;

import Sidebar from "./sidebar";

@Radium
class Docs extends React.Component {

  componentWillMount() {
    ga.pageview(`${routingConfig.base}docs`);
  }

  getDocsStyles() {
    return {
      margin: "1rem 0 0 0",
      padding: "1rem 0.5rem",
      "@media (min-width: 70em)": {
        flex: "1",
        margin: 0,
        padding: "60px 1rem"
      }
    };
  }

  getMainStyles() {
    return {
      display: "flex",
      flex: "1 0 auto",
      flexDirection: "column",
      margin: "0 auto",
      padding: "1rem",
      "@media (min-width: 70em)": {
        "flexDirection": "row",
        margin: "0 2.5rem"
      }
    };
  }

  _renderDocsList() {
    return components.map((component) => {
      return (
        <li key={component.slug}>
          <Link to={`docs/${component.slug}`}>
            {component.text}
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div style={{display: "flex", minHeight: "100vh", flexDirection: "column"}}>
        <Header
          text={"Interested in using Victory on your next project? Let’s talk."}
        />
        <main style={this.getMainStyles()}>
          <Sidebar active={""} />
          <section style={this.getDocsStyles()}>
            <Ecology
              overview={require("!!raw!../ecology-getting-started.md")}
              scope={{React, ReactDOM, V, VictoryChart, VictoryLine, VictoryPie}}
              playgroundtheme="elegant" />
            <h3>Explore the interactive docs:</h3>
            {this._renderDocsList()}
          </section>
        </main>
        <Footer/>
        <Style rules={VictoryTheme}/>
        {/* We need padding: 5px on `.Ecology code`; putting it here for now */}
        <Style
          scopeSelector={".Ecology"}
          rules={{
            code: {
              padding: "5px"
            }
          }}
        />
      </div>
    );
  }
}

export default Docs;
