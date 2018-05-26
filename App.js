import React from 'react';

// FOR REDUX
import rootReducer from "./src/reducer";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";

import AppRoute from "./src/router";
import App from "./src/container/App";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

class AppProvider extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <AppRoute />
      </Provider>
    );
  }
}

export default AppProvider;