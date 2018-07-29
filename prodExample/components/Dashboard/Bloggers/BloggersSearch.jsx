import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';
import {
  ClipLoader
} from 'react-spinners';
import {
  AlertNotify
} from '../../../components';
import {
  BloggersSearchFilters,
  Blogger,
  NotFound,
} from './';
import { bloggersActions } from '../../../actions';


class BloggersSearch extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentPage: 1
    }
  }

  handleLoadMoreButton() {
    const {
      dispatch,
      user,
      bloggers
     } = this.props;
    const searchParams = JSON.parse(localStorage.getItem('bloggersSearchParams'));
    
    this.setState({ currentPage: this.state.currentPage + 1}, () => {
      dispatch(bloggersActions.loadMore({
        ...searchParams,
        page: bloggers.current_page + 1,
        api_token: user.api_token
      }, true));
    })
  }
  render() {
    const { bloggers, alert } = this.props;

    return (
      <div className="bloggers-search">
        <BloggersSearchFilters />

        {!bloggers && bloggers.fetching && <div className="loader">
          <ClipLoader width={100}/>
        </div>}

        {bloggers && !bloggers.fetching && <Container>
          <Row className="bloggers-search__list">
            {!_.isEmpty(bloggers.data) ? _.map(bloggers.data, (blogger, index) => {
              return (
                <Col
                  key={index}
                  xs={12}
                >
                  <Blogger
                    blogger={blogger}
                    hasProfileLink
                  />
                </Col>
              )
            }) : <NotFound />}

            {bloggers && bloggers.fetchingMore && <div className="loader">
              <ClipLoader width={100}/>
            </div>}

            {alert.message && <div className="px-3 py-2">
              <AlertNotify alert={alert}/>
            </div>}
            {
              !bloggers.fetchingMore && bloggers.current_page !== bloggers.last_page && <div className="bloggers-search-loadmore-container">
                <Button
                  className=""
                  color="success"
                  onClick={() => this.handleLoadMoreButton()}
                  outline
                  size="sm"
                >
                  Показать больше
                </Button>
              </div>
            }
            
          </Row>
        </Container>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  bloggers: state.bloggers,
  platform: state.platform,
  alert: state.alert,
});

const connectedBloggersSearch = connect(mapStateToProps)(BloggersSearch);

export {
  connectedBloggersSearch as BloggersSearch
}
