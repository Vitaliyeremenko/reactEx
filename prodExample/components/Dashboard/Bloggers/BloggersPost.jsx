import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

class BloggersPost extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentPage: 1
    }
  }

  render() {
    const { post: {
      created_at,
      caption,
      comments_count,
      engagement,
      like_count,
      media_url,
      permalink,
      media_type,
    } 
  } = this.props;
  let newEngagement = engagement * 100;
  newEngagement = newEngagement.toFixed(2);
    return (
      <div className="user-net-preview">
        <div className="user-net-preview-preview-date">
          <FontAwesome name="icon-calendar" />
          { created_at }
        </div>
        <div className="user-net-preview-image with-hint">
          <a style={{ backgroundImage: 'url(' + media_url + ')'}}  href={permalink} target="-blank" >
            {
              caption && <div className="user-net-preview-hover-text ">
              { caption }
            </div>
            }
          </a>
        </div>
        <div className="user-net-preview-stats">
          <div className="user-net-preview-stat">
            <FontAwesome name="thumbs-up" />
            <div className="user-net-preview-stat-val">{ like_count }</div>
          </div><div className="user-net-preview-stat">
            <FontAwesome name="comment" />
            <div className="user-net-preview-stat-val">{ comments_count }</div>
          </div>
          <div className="user-net-preview-stat">
            <FontAwesome name="fire" />
            <div className="user-net-preview-stat-val">{newEngagement}%</div>
          </div>
        </div>
      </div>
    )
  }
}

export default BloggersPost;
