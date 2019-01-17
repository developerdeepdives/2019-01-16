import React from 'react';
import classes from './RecentPosts.module.css';
import Posts from './Posts/Posts';

const recentPosts = props => {
  return (
    <div className={classes.RecentPosts}>
      <h3 className={classes.Title}>Recent Posts</h3>
      <Posts posts={props.posts} handleSelectPost={props.handleSelectPost}/>
    </div>
  );
}

export default recentPosts;