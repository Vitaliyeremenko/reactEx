import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const { scrollableElement } = this.props;

      if (scrollableElement) {
        scrollableElement.scrollTop = 0;
      }
    }
  }

  render() {
    return this.props.children;
  }
}

const ScrollToTopWithRouter = withRouter(ScrollToTop);
export {
  ScrollToTopWithRouter as ScrollToTop,
};
