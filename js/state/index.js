import { applyMiddleware, createStore, compose } from "redux"
import { persistStore, autoRehydrate } from "redux-persist"
import { AsyncStorage } from "react-native"
import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"
import reducers from "./reducers"

const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__
});

const middlewares = compose(applyMiddleware(thunkMiddleware, loggerMiddleware), autoRehydrate());

export default {
  configureStore: () => {
    const store = createStore(reducers, undefined, middlewares);
    return store;
  },

  persistStore: (store, cb) => {
    persistStore(store, {storage: AsyncStorage}, () => {
      if (cb)
          cb();
    });
  } 
} 
