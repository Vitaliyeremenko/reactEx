import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Fade } from 'react-reveal';
import {
  Collapse,
  Button,
  CardBody,
  Card
} from 'reactstrap';

class Question extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const { text, answer } = this.props;

    return (
      <div className="questions__item">
        <p className={`questions__item-desc ${this.state.collapse && 'isOpen'}`} onClick={this.toggle}>{text}</p>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              {answer}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

const fakeQuestions = [
  {
    text: "...я свяжусь с блогерами напрямую?",
    answer: "На платформе зарегистрированы блогеры которые успешно прошли все этапы модерации. За пределами платформы вам будет сложно находить аккаунты с живой и активной целевой аудиторией."
  },
  {
    text: "...я закажу рекламу у блогеров через агентство?",
    answer: "Агентства работают только с большими бюджетами, высокими комиссиями со сделок и предлагают к выбору ограниченное число блогеров, что делает размещение рекламы невыгодным."
  },
  {
    text: "...я хочу работать по бартеру?",
    answer: "Большинство блогеров потенциально готовы сотрудничать с рекламодателями по бартеру. Во многом, согласие блогера зависит от ценности для него предлагаемого вами продукта или услуги"
  },
];

const Questions = () => (
  <section className="questions">
    <Fade>
      <Container>
        <div className="steps__heading">
          <h2>А что если...</h2>
          <div className="underline underline-green"></div>   
        </div>

        {fakeQuestions.map((question, index) => (
          <Fade
            left
            delay={index *= 35}
            fraction={0}
            key={index}
          >
            <Question
              text={question.text}
              answer={question.answer}
            />
          </Fade>
        ))}
      </Container>
    </Fade>
  </section>
);

export {
  Questions
};