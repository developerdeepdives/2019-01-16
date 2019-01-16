import React from 'react';
import classes from './Posts.module.css';
import Post from './Post/Post';

const posts = props => (
  // props.posts
  <div className={classes.Posts}>
    {props.posts.map(post => (
      <Post
        key={post.id}
        author={post.author} 
        title={post.title}
      />)
    )}
    {/* <Post />
    <Post />
    <Post />
    <Post /> */}
  </div>
);

export default posts;