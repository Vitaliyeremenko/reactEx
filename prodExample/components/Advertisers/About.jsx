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
      <Row>
        <Col xs={12} md={6} className="about__block">
          <Fade left fraction={0}>
            <h3 className="about__block-title">Аккаунты с реальными подписчиками</h3>
            <Row>
              <Col xs={3}>
                <img className="img-fluid" src={require('../../../img/people.png')} alt="people"/>
              </Col>
              <Col xs={9}>
                <p className="about__block-desc">Каждый аккаунт проходит модерацию. Отсеиваются накрученные подписчики и боты, рассчитывается охват активной аудитории. </p>
              </Col>
            </Row>
          </Fade>
        </Col>
        <Col xs={12} md={6} className="about__block">
          <Fade right fraction={0}>
            <h3 className="about__block-title">Реальная стоимость рекламы</h3>
            <Row>
              <Col xs={3}>
                <img className="img-fluid" src={require('../../../img/coins.png')} alt="coins"/>
              </Col>
              <Col xs={9}>
                <p className="about__block-desc">Мы рассчитываем стоимость рекламы, исходя из охвата активной аудитории. Платите только за реальные просмотры.</p>
              </Col>
            </Row>
          </Fade>
        </Col>
        <Col xs={12} md={6} className="about__block">
          <Fade left fraction={0}>
          <h3 className="about__block-title">Личный ПОДБОР БЛОГЕРОВ.</h3>
          <Row>
            <Col xs={3}>
              <img className="img-fluid" src={require('../../../img/dashboard.png')} alt="dashboard"/>
            </Col>
            <Col xs={9}>
              <p className="about__block-desc">Платформа подберет блогеров с качественной целевой аудиторией которая заинтересована в вашем продукте.</p>
            </Col>
          </Row>
          </Fade>
        </Col>
        <Col xs={12} md={6} className="about__block">
          <Fade right fraction={0}>
          <h3 className="about__block-title">БЕЗОПАСНЫЕ ОНЛАЙН-СДЕЛКИ.</h3>
          <Row>
            <Col xs={3}>
              <img className="img-fluid" src={require('../../../img/phonecard.png')} alt="phonecard"/>
            </Col>
            <Col xs={9}>
              <p className="about__block-desc">Производите оплату через платформу. Блогер получит свои деньги, только после того как разместит вашу рекламу.</p>
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