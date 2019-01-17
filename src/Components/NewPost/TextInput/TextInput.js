import React from 'react';
import classes from './TextInput.module.css';

export default props => (
  <div className={classes.TextInput}>
    <label>{props.children}<input onChange={props.handleChange} value={props.value} type="text" placeholder={props.children} /></label>
  </div>
)