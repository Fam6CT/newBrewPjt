import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import BrewList from "./BrewList";

function Home() {
  const listItems = [
    "micro",
    "nano",
    "regional",
    "brewpub",
    "large",
    "planning",
    "bar",
    "contract",
    "proprietor",
    "closed",
  ];
  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h1>Welcome to Unique Brewery</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Container>
      </Jumbotron>
      <br />
      <BrewList listItems={listItems} />
    </div>
  );
}

export default Home;
