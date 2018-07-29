import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {
  ShareButtons,
  generateShareIcon,
} from 'react-share';

const {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const PinterestIcon = generateShareIcon('pinterest');

const Footer = () => (
  <footer className="footer">
    <Container>
      <Row className="align-items-md-center">
        <Col xs={12} md={6}>

          <Breadcrumb tag="nav">
          <BreadcrumbItem tag={NavLink} exact to="/">Рекламодателям</BreadcrumbItem>
          <BreadcrumbItem tag={NavLink} exact to="/bloggers">Блогерам</BreadcrumbItem>
          <BreadcrumbItem tag={NavLink} exact to="/login">Войти</BreadcrumbItem>
          <BreadcrumbItem tag={NavLink} exact to="/register">Получить доступ</BreadcrumbItem>
        </Breadcrumb>

        </Col>
        <Col xs={12} md={6} className="text-md-right">
          <ul className="list-inline align-items-center d-flex justify-content-center justify-content-md-end mt-3 mt-md-0 mb-md-0">
            <li className="list-inline-item">
              <TwitterShareButton
                url="https://google.com"
                title="Рыбный текст"
                className="Demo__some-network__share-button"
              >
                <TwitterIcon
                  size={45}
                  round
                />
              </TwitterShareButton>
            </li>
            <li className="list-inline-item">
              <div>
                <img src={require('../../img/rss.png')} alt="rss" />
              </div>
            </li>
            <li className="list-inline-item">
              <FacebookShareButton
                url="https://google.com"
                quote="Рыбный текст"
              >
                <FacebookIcon
                  size={45}
                  round
                />
              </FacebookShareButton>
            </li>
            <li className="list-inline-item">
              <PinterestShareButton
                url={String(window.location)}
                media={`${String(window.location)}`}
                windowWidth={1000}
                windowHeight={730}
                className="Demo__some-network__share-button"
              >
                <PinterestIcon size={45} round />
              </PinterestShareButton>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  </footer>
);

export {
  Footer,
};
