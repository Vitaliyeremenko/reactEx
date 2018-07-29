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

const About = () => (
  <section className="about">
    <Container>
      <Zoom fraction={0}>
        <div className="about__heading">
          <h2>Вы получите</h2>
          <div className="underline underline-green"></div>   
        </div>
      </Zoom>
      <Row className="align-items-center">
        <Col xs={12} md={6} className="about__block">
          <Fade left fraction={0}>
          <h3 className="about__block-title">Надёжный канал постоянного заработка</h3>
          <Row>
            <Col xs={3}>
              <img className="img-fluid" src={require('../../../img/hands.png')} alt="hands"/>
            </Col>
            <Col xs={9}>
              <p className="about__block-desc">Наше сотрудничество строится на доверии и надежности. Мы дорожим каждым клиентом и предлагаем реальный доход.</p>
            </Col>
          </Row>
          </Fade>
        </Col>
        <Col xs={12} md={6} className="about__block">
          <Fade right fraction={0}>
            <h3 className="about__block-title">Прямой доступ к тысячам рекламодателей Казахстана</h3>
            <Row>
              <Col xs={3}>
                <img className="img-fluid" src={require('../../../img/people.png')} alt="people"/>
              </Col>
              <Col xs={9}>
                <p className="about__block-desc">Вам не придется постоянно находиться в поисках клиентов, мы предоставляем прямой доступ к базе рекламодателей самых популярных брендов Казахстана.</p>
              </Col>
            </Row>
          </Fade>
        </Col>
        <Col xs={12} md={6} className="about__block">
          <Fade left fraction={0}>
            <h3 className="about__block-title">Полную гарантию оплаты рекламных публикаций</h3>
            <Row>
              <Col xs={3}>
                <img className="img-fluid" src={require('../../../img/cards.png')} alt="cards"/>
              </Col>
              <Col xs={9}>
                <p className="about__block-desc">Наша компания гарантирует оплату рекламных материалов, размещенных в вашей ленте. Зарабатывайте без риска!</p>
              </Col>
            </Row>
          </Fade>
        </Col>
        <Col xs={12} md={6} className="about__block">
          <Fade right fraction={0}>
            <h3 className="about__block-title">Ты станешь более популярным</h3>
            <Row>
              <Col xs={3}>
                <img className="img-fluid" src={require('../../../img/ryp.png')} alt="ryp"/>
              </Col>
              <Col xs={9}>
                <p className="about__block-desc">Мы расскажем о вас не только рекламодателям, но и потенциальным подписчикам, привлекая живую и активную аудиторию.</p>
              </Col>
            </Row>
          </Fade>
        </Col>
      </Row>
    </Container>
  </section>
);

export {
  About
}