import React, { Component } from 'react';
import classes from './Layout.module.css';
import RecentPosts from '../../Components/RecentPosts/RecentPosts';
import axios from 'axios';

class Layout extends Component {
  state = {
    posts: []
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
        console.log(response);
        const manipulatedData = response.data.map(post => {
          post.author = 'Tyler Schum'
          return post;
        });
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



  render() {
    return (
      <div className={classes.Layout}>
        <RecentPosts posts={this.state.posts} />
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default Layout;

// import Layout from '../Layout/Layout';