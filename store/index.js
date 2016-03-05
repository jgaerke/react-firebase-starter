import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, compose(
      window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = reducers;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}