import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
} from '../../components/Advertisers';

const Advertisers = () => (
  <div className="Advertisers">
    <Helmet>
      <title>Рекламодателям | TheMost</title>
    </Helmet>
    <Navigation theme="default" />
    <Content>
      <Intro />
      <About />
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
  Advertisers
}