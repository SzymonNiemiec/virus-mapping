import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./";
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:5050/api';


const Store = () => {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(
        thunkMiddleware
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
};

const store = Store();

export default store;