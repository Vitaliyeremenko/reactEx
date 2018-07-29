import React from 'react';
import { Alert } from 'reactstrap';
import { Helmet } from 'react-helmet';

const NotFound = () => (
  <div className="page404">
    <Helmet>
      <title>Страница не найдена | TheMost</title>
    </Helmet>
    <Alert color="danger">
      404. Страница не найдена.
    </Alert>
  </div>
);

export {
  NotFound
}