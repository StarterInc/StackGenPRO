import React from "react";
import ReactDOM from "react-dom";
import { Row, Col, Container } from "react-bootstrap";
import Csat from "./components/Csat/";
import "./css/bootstrap-flatly.css";
function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            epudiated and annoyances accepted. The wise man therefore always
            holds in these matters to this principle of selection: he rejects
            pleasures to secure other greater pleasures, or else he endures
            pains to avoid worse pains."
          </Col>
          <Col>
            these matters to this principle of selection: he rejects pleasures
            to secure other greater pleasures, or else he endures pains to these
            matters to this principle of selection: he rejects pleasures to
            secure other greater pleasures, or else he endures pains to these
            matters to this principle of selection: he rejects pleasures to
            secure other greater pleasures, or else he endures pains to
          </Col>
        </Row>
        <Row>
          <Col>
            <Csat />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
