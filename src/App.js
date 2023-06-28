import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Form, Button, Col, Image } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { getImageUrl } from "./axiosHelper/axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [prompt, setprompt] = useState("");
  const [number, setNumber] = useState(1);
  const [size, setSize] = useState("");
  const [link, setLink] = useState(null);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = await getImageUrl(prompt, number);
    setLink(data.url);

    toast(data.status);
  };
  // console.log(link);
  return (
    <Container>
      <Row>
        <Form onSubmit={handleOnSubmit}>
          <Form.Control
            placeholder="enter the image you want to generate"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              setprompt(e.target.value);
            }}
          />
          <Form.Label>Number of Images:{number}</Form.Label>
          <Form.Range
            min={1}
            max={10}
            defaultValue={1}
            onChange={(e) => setNumber(parseInt(e.target.value))}
          />

          <Button variant="primary" id="button-addon2" type="submit">
            submit
          </Button>
        </Form>
      </Row>

      <Row>
        {!link && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

        {link &&
          link.map((item, i) => (
            <Col xs={6} md={4} key={i}>
              <a href={item.url} target="_blank">
                <Image src={item.url} thumbnail />
              </a>
            </Col>
          ))}
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default App;
