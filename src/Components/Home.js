import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import BrewList from "./BrewList";

function Homes() {
  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h1>Welcome to Unique Brewery</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Container>
      </Jumbotron>
      <br />
      <BrewList />
    </div>
  );
}

export default Homes;
