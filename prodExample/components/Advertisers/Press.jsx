import React from 'react';
import {
  Fade
} from 'react-reveal';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

const fakeItems = [
  {
    img: require('../../../img/forbes.png')
  },
  {
    img: require('../../../img/forbes.png')
  },
  {
    img: require('../../../img/forbes.png')
  },
  {
    img: require('../../../img/forbes.png')
  },
  {
    img: require('../../../img/forbes.png')
  },
  {
    img: require('../../../img/forbes.png')
  },
  {
    img: require('../../../img/forbes.png')
  },
  {
    img: require('../../../img/forbes.png')
  },
  {
    img: require('../../../img/forbes.png')
  },
  {
    img: require('../../../img/forbes.png')
  },
];

const Press = () => (
  <section className="press">
    <Fade fraction={0}>
      <Container>
        <div className="press__heading">
          <h2>О нас в прессе</h2>
          <div className="underline underline-green"></div>   
        </div>

        <Row>
          {fakeItems.map((item, index) => (
            <Col key={index} xs={4} md={3} lg={2} className="mb-4">
              <img
                src={item.img}
                className="img-fluid" alt="press"
              />
            </Col>)
          )}
        </Row>
      </Container>
    </Fade>
  </section>
);

export {
  Press
}