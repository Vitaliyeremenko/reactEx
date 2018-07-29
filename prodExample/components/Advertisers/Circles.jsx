import React, { Component } from 'react';
import {
  Fade
} from 'react-reveal';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import {
  Link
} from 'react-router-dom';

import CircularProgressbar from 'react-circular-progressbar';
import CountUp from 'react-countup';

const fakeValues = [
  {
    name: 'Блогеров',
    value: 1635,
    maxValue: 5000
  },
  {
    name: 'Рекламодателей',
    value: 635,
    maxValue: 10000
  },
  {
    name: 'Площадок',
    value: 1100,
    maxValue: 10000
  },
  {
    name: 'Просмотров',
    value: 16300,
    maxValue: 16300
  }
]

class Circles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fakeValues,
      animate: false,
    };

    this.calculateProgress = this.calculateProgress.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
  }

  calculateProgress(value, maxValue) {
    return (value / maxValue) * 100;
  }

  startAnimation() {
    this.setState({
      animate: true,
    })
  }

  render() {
    const { fakeValues, animate } = this.state;

    return (
      <section className="circles">
        <Fade onReveal={this.startAnimation} fraction={.5}>
          <Container>
            <div className="circles__heading">
              <h2>О нас в цифрах</h2>
              <div className="underline underline-green"></div>   
            </div>
              <Row className="text-center">
                {fakeValues.map((item, index) => (
                  <Col xs={6} md={3} key={index}>
                    {animate && <div style={{ position: 'relative '}}>
                      <CountUp
                        start={0}
                        duration={1.5}
                        end={item.value}
                        className="CircularProgressbar-text"
                      />
                      <CircularProgressbar
                        initialAnimation={animate}
                        strokeWidth={3}
                        percentage={this.calculateProgress(item.value, item.maxValue)}
                        textForPercentage={() => null}
                      />
                    </div>}
                    <h3 className="circle-title">{item.name}</h3>
                  </Col>
                ))}
              </Row>
          </Container>
        </Fade>
      </section>
    );
  }
}

export {
  Circles
}