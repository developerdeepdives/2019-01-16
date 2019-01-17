This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To Get Started

- Install Node at [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- Navigate to this directory in your shell of choice
- Run the command 'npm install'
- Good to go!

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Recap 1/16/2019

### Prop Drilling

##### Definition

Used to pass data from a component higher up in the component hierarchy to a child component further down.
It allows developers to access state at different levels of the component hierarchy in smaller applications without the use of a state management tool [Redux](https://redux.js.org/) or [Context](https://reactjs.org/docs/context.html).

##### Example

Line 31 in our `Layout.js`, we initialize a new method `handleSelectPost`. This will manage altering the state of `selectedPost`. The method is passed down through multiple child components until reaching `Post.js` where it's added as an `onClick` event handler.

`Layout.js` > `RecentPosts.js` > `Posts.js` > `Post.js`

### React Lifecycle

React gives us the ability to declare special methods on the component class to run some code when a component mounts and unmounts. Our app uses one such method.

It takes advantage of `componentDidUpdate`, which is invoked immediately after a component has been altered.

It allows `FullPost.js` to pickup on the fact that our `selectedPost` prop from `Layout.js` has changed and therefore it should make a call to [JSONPlaceholder](https://jsonplaceholder.typicode.com/), retrieve the selected post and set it to `postInfo`, a piece of state within the component.

### Axios Instance

`axios` is a promise-based HTTP client for the browser. It will handle all of our requests to and responses from the server, in this case [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

`axios` provides the ability to tuck a little of it's boilerplate away and set up some configuration defaults in an instance. In our case saving us from redundently using the full URL of our server throughout our code.

The following piece of code is included in a file in our root directory called `axios.js`.

```javascript
import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});
export default instance;
```

Which then allows the developer to import and use within any of their `axios` method invocations.

##### Example

`FullPost.js`

```javascript
axios
  .get("/posts/" + this.props.selectedPost)
  .then(res => {
    this.setState({
      postInfo: res.data
    });
  })
  .catch(err => {
    console.log(err);
  });
```

### Axios Interceptors

`axios` allows a developer to intercept requests or responses before they are handled by then or catch. This can be extremely useful with a process like token validation. Where an interceptor can validate a token prior to a client making a request thus saving the server from taking on an unnecessary task.

`axios.js`

```javascript
instance.interceptors.request.use(config => {
  config.headers.authorization = "bearer_token"; // or whatever the header should be;
  return config;
});

instance.interceptors.response.use(
  response => {
    // handle response
    return response;
  },
  err => {
    // handle error
  }
);
```
