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
  const [link, setLink] = useState(null);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const respPending = getImageUrl(prompt, number);
    toast.promise(respPending, { loading: "Please wait" });
    const data = await respPending;
    setLink(data.url);

    toast(data.message);
  };
  // console.log(link);
  return (
    <Container className="d-flex justify-content-center mx-auto align-items-center">
      <h1>Your wish is our command.</h1>
      <Form onSubmit={handleOnSubmit} className="form d-flex w-100 gap-5">
        <div className="w-100">
          <Form.Control
            type="text"
            placeholder="Enter the image you want to generate"
            onChange={(e) => {
              setprompt(e.target.value);
            }}
          />
        </div>

        <div className="w-100">
          <Form.Control
            type="number"
            min={1}
            max={10}
            defaultValue={1}
            onChange={(e) => setNumber(parseInt(e.target.value))}
          />
        </div>

        <div className="d-flex">
          <Button variant="dark" id="button-addon2" type="submit">
            submit
          </Button>
        </div>
      </Form>

      <Row className="mt-5">
        {!link && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

        {link &&
          link.map((item, i) => (
            <Col xs={6} md={4} key={i}>
              <a href={item.url} target="_blank" rel="noreferrer">
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
