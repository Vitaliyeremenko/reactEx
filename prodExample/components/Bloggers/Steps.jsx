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
                <strong>Привяжи свои аккаунты</strong> в социальных сетях
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
                Получай предложения о сотрудничестве от <strong>лучших рекламодателей Казахстана.</strong>
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
                <strong>Выбирай продукцию</strong> под свою целевую аудиторию
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
                Отлично выполнив работу <strong>повышай свой рейтинг</strong>
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
                Выставляй счета и получай <strong>гарантированную оплату</strong>
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