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

const Register = () => (
  <section className="register">
    <Container>
      <Fade top>
        <div className="about__heading">
          <h2>Регистрируйтесь, если:</h2>
          <div className="underline underline-green"></div>   
        </div>
      </Fade>
      <Row className="align-items-center">
        <Col xs={12} md={6} className="register__block">
          <Fade left>
            <Row className="align-items-md-center">
              <Col xs={2}>
                <img className="img-fluid" src={require('../../../img/monitor.png')} alt="monitor"/>
              </Col>
              <Col xs={10}>
                <p className="register__block-desc">Ты ведёшь блог в Instagram, Facebook или на YouTube.</p>
              </Col>
            </Row>
          </Fade>
        </Col>
        <Col xs={12} md={6} className="register__block">
          <Fade right>
            <Row className="align-items-md-center">
              <Col xs={2}>
                <img className="img-fluid" src={require('../../../img/sobor.png')} alt="sobor"/>
              </Col>
              <Col xs={10}>
                <p className="register__block-desc">Более 50% твоих подписчиков из Казахстана.</p>
              </Col>
            </Row>
          </Fade>
        </Col>
        <Col xs={12} md={6} className="register__block">
          <Fade left>
            <Row className="align-items-md-center">
              <Col xs={2}>
                <img className="img-fluid" src={require('../../../img/pen.png')} alt="pen"/>
              </Col>
              <Col xs={10}>
                <p className="register__block-desc">Ты публикуешь качественный контент.</p>
              </Col>
            </Row>
          </Fade>
        </Col>
        <Col xs={12} md={6} className="register__block">
          <Fade right>
            <Row className="align-items-md-center">
              <Col xs={2}>
                <img className="img-fluid" src={require('../../../img/people.png')} alt="people"/>
              </Col>
              <Col xs={10}>
                <p className="register__block-desc">У тебя более 1000 реальных подписчиков.</p>
              </Col>
            </Row>
          </Fade>
        </Col>
      </Row>
    </Container>
  </section>
);

export {
  Register
}