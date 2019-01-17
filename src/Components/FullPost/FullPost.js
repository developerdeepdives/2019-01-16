import React, { Component } from 'react';
import classes from './FullPost.module.css';
import axios from '../../axios';

export default class extends Component {

  state = {
    postInfo: null
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedPost) {
      if (!this.state.postInfo || prevProps.selectedPost !== this.props.selectedPost) {
        axios.get('/posts/' + this.props.selectedPost)
          .then(response => {
            // console.log(response);
            this.setState({ postInfo: response.data });
          })
          .catch(err => {
            const display = {
              title: "Error Occurred"
            }
            if (err.response.status === 404) {
              display.body = "The requested post could not be found."
            } else {
              display.body = err.message
            }
            this.setState({
              postInfo: display
            })
          })
      }
    }
  }

  handleDeletePost = id => {
    axios.delete('/posts/' + id)
      .then(response => {
        this.props.handleSelectPost("");
        this.setState({
          postInfo: null
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    console.log(this.state.postInfo)
    let post = <div>Please select a post</div>;
    if (this.props.selectedPost) {
      post = <div>Loading...</div>;
    }
    if (this.state.postInfo) {
      const { title, body, id } = this.state.postInfo;
      post = (
        <>
          <h1>{title}</h1>
          <p>{body}</p>
          <div className={classes.Edit}>
            <button onClick={() => this.handleDeletePost(id)} className={classes.Delete}>Delete</button>
          </div>
        </>
      )
    }
    return (
      <div className={classes.CurrentPost}>
        <div className={classes.FullPost}>
          {post}
        </div>
      </div>
    )
  }
}