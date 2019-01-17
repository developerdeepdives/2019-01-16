import React, { Component } from 'react';
import classes from './Layout.module.css';
import RecentPosts from '../../Components/RecentPosts/RecentPosts';
import FullPost from '../../Components/FullPost/FullPost';
import NewPost from '../../Components/NewPost/NewPost';
import axios from 'axios';

class Layout extends Component {
  state = {
    posts: [],
    selectedPost: ""
  }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     posts: []
  //   }
  // }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        const manipulatedData = response.data
          .slice(0, 10)
          .map(post => {
            post.author = 'Tyler Schum'
            return post;
          })
        this.setState({
          posts: manipulatedData
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          posts: []
        });
      });
  }

  handleSelectPost = postId => {
    this.setState({
      selectedPost: postId
    });
  }

  handleAddPost = newPost => {
    const posts = this.state.posts.slice();
    posts.push(newPost);
    this.setState({
      posts
    });
  }

  render() {
    return (
      <div className={classes.Layout}>
        <RecentPosts
          handleSelectPost={this.handleSelectPost}
          posts={this.state.posts} 
        />
        <FullPost selectedPost={this.state.selectedPost} handleSelectPost={this.handleSelectPost}/>
        <NewPost handleAddPost={this.handleAddPost} posts={this.state.posts} />
      </div>
    );
  }
}

export default Layout;

// import Layout from '../Layout/Layout';