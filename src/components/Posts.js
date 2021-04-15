import React, { Component } from "react";
import { fetchPosts } from "../actions/postActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Posts extends Component {
  constructor() {
    super();
    this.state = "";
  }
  componentDidMount() {
    this.props.fetchPosts();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  }
  render() {
    const postItems = this.props.posts.map((post) => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
    return (
      <div>
        <h1>Posts</h1>
        {postItems}
      </div>
    );
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object.isRequired,
};

const mapStateToProps = ({ posts }) => ({
  posts: posts.items,
  newPost: posts.item,
});
export default connect(mapStateToProps, { fetchPosts })(Posts);
