import React from 'react';
import {
  Fade,
  Zoom
} from 'react-reveal';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import {
  Link
} from 'react-router-dom';

const Intro = () => (
  <header className="intro">
    <div className="intro-overlay"></div>
    <Fade fraction={0}>
      <Container>
        <Row>
          <Col xs={12} lg={6}>
            <h1 className="title">Themost <span className="slogan"> - платформа, объединяющая рекламодателей и блогеров.</span></h1>
            <p className="desc">Помогаем компаниям и брендам распространять свои маркетинговые активности через мнений блогеров и лидеров, а блогерам — зарабатывать на рекламе деньги.</p>
            <Link className="btn btn-success text-white" to="/register">Начать работать</Link>
          </Col>
          <Col xs={12} lg={6} className="mt-4 mt-lg-0">
            <img
              className="img-fluid"
              src={require('../../../img/preview.png')}
              alt='preview'
            />
          </Col>
        </Row>
      </Container>
    </Fade>
  </header>
);

export {
  Intro
}