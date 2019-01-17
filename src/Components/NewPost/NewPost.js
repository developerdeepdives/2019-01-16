import React, { Component } from 'react';
import classes from './NewPost.module.css';
import TextInput from './TextInput/TextInput';
import axios from '../../axios';


export default class extends Component {

  state = {
    title: "",
    author: "",
    body: "",
    id: ""
  }
  
  createPost = () => {
    const newPost = {
      title: this.state.title,
      author: this.state.author,
      body: this.state.body,
      id: Math.floor(Math.random() * 100000) // Not Ideal, but we are limited on options since we are using dummy data. This would normally not need to be set here, and simply be assigned by your database
    }

    axios.post('/posts', newPost)
      .then(response => {
        console.log(response.data);
        this.setState({
          title: "",
          author: "",
          body: "",
          id: ""
        }, this.props.handleAddPost(newPost))
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const { title, author, body } = this.state;
    return (
      <div className={classes.NewPost}>
        <div>
          <TextInput handleChange={e => this.setState({ title: e.target.value })} value={title}>Title</TextInput>
          <TextInput handleChange={e => this.setState({ author: e.target.value })} value={author}>Author</TextInput>
          <div className={classes.Textarea}>
            <label>Content<textarea onChange={e => this.setState({ body: e.target.value })} value={body} type="text" placeholder="Enter Post Content here..."></textarea></label>
          </div>
          <button onClick={this.createPost}>Add Post</button>
        </div>
      </div>
    );
  } 
} 