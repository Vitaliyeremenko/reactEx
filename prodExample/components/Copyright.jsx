import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Copyright = () => (
  <div className="copyright">
    <Container>
      <Row>
        <Col xs={12} sm={6} className="text-center text-sm-left">
          Copyright <a className="text-green" href="/">TheMost</a> 2018.  All  Rights  Reserved
        </Col>
        <Col xs={12} sm={6} className="text-center text-sm-right">
          Разработка и создание <a className="text-green" href="http://webid.kz" target="_blank">WebID.kz</a>
        </Col>
      </Row>
    </Container>
  </div>
);

export {
  Copyright
}