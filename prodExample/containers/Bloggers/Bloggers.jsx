import React from 'react';
import { Container } from 'reactstrap';
import { Helmet } from 'react-helmet';
import {
  Navigation,
  Content,
  Footer,
  Copyright,
} from '../../components';
import {
  Intro,
  About,
  Platform,
  Steps,
  Questions,
  Circles,
  Press,
  Register,
} from '../../components/Bloggers';

const Bloggers = () => (
  <div className="Bloggers">
    <Helmet>
      <title>Блогерам | TheMost</title>
    </Helmet>
    <Navigation theme="default"/>
    <Content>
      <Intro />
      <About />
      <Register />
      <Platform />
      <Steps />
      <Questions />
      <Circles />
      <Press />
    </Content>
    <Footer />
    <Copyright />
  </div>
);

export {
  Bloggers
}