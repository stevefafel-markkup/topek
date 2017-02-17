import { applyMiddleware, createStore, compose } from "redux"
import { persistStore, autoRehydrate } from "redux-persist"
import { AsyncStorage } from "react-native"
import thunk from "redux-thunk"
import logger from "redux-logger"
import reducers from "./reducers"

const middlewares = compose(applyMiddleware(thunk, logger), autoRehydrate());

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