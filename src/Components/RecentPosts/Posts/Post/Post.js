import React from 'react';
import classes from './Post.module.css';

const post = props => {
  return (
    <article onClick={props.handleSelectPost} className={classes.Post}>
      <h1>
        {props.title}
      </h1>
      <div>
        <div className={classes.Author}>{props.author}</div>
      </div>
    </article>
  );
}

export default post;