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

const Steps = () => (
  <section className="steps">
    <Container>
      <Zoom fraction={0}>
        <div className="steps__heading">
          <h2>Как это работает:</h2>
          <div className="underline underline-green"></div>
        </div>
      </Zoom>
      <Fade fraction={0}>
      <Row>
        <Col xs={12} md={6}>
          <div className="step">
            <div>
              <div className="circle">
                <div className="circle-inner">1</div>
              </div>
              <div className="line"></div>
            </div>
            <div>
              <p className="step-desc">
                <Link to="/register" className="link-underlined">
                  <strong>Зарегистрируйся на платформе.</strong>
                </Link>
              </p>
            </div>
          </div>
          <div className="step">
            <div>
              <div className="circle">
                <div className="circle-inner">2</div>
              </div>
              <div className="line"></div>
            </div>
            <div>
              <p className="step-desc">
                <strong>При помощи фильтров подбора</strong>, найдите блогеров с вашей целевой аудитории и по вашему бюджету на рекламу. 
              </p>
            </div>
          </div>
          <div className="step medium">
            <div>
              <div className="circle">
                <div className="circle-inner">3</div>
              </div>
              <div className="line"></div>
            </div>
            <div>
              <p className="step-desc">
                <strong>Коротко расскажите о вашем продукте (услуге)</strong> и укажите ваши пожелания о рекламе.
              </p>
            </div>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="step">
            <div>
              <div className="circle">
                <div className="circle-inner">4</div>
              </div>
              <div className="line"></div>
            </div>
            <div>
              <p className="step-desc">
                <strong>В месенджере платформы</strong> обсудите детали о вашей рекламе.
              </p>
            </div>
          </div>
          <div className="step">
            <div>
              <div className="circle">
                <div className="circle-inner">5</div>
              </div>
              <div className="line"></div>
            </div>
            <div>
              <p className="step-desc">
                <strong>Купите валюту платформы - токены.</strong> С ее помощью вы будете рассчитываться с блогером
              </p>
            </div>
          </div>
          <div className="step">
            <div>
              <div className="circle">
                <div className="circle-inner">6</div>
              </div>
              <div className="line"></div>
            </div>
            <div>
              <p className="step-desc">
                Как только блогер выставит счет за рекламу, <strong>оплатите его через платформу.</strong> Так мы сможем защитить вашу сделку. Блогер получит деньги только после того, как вы подтвердите, что работа выполнена.
              </p>
            </div>
          </div>
        </Col>
      </Row>
      </Fade>
    </Container>
  </section>
);

export {
  Steps
}