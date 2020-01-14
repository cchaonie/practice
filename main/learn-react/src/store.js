import {
  createStore,
  applyMiddleware
} from 'redux';

function reducer(state, action) {
  const {
    type,
    payload
  } = action
  switch (type) {
    // case
    default:
      return {
        ...state,
        ...payload
      }
  }
}

const initialState = {
  conut: 1
}

const loggerA = function ({ getState }) {
  return next => {
    // console.log("loggerA", next)
    return action => {
      // console.log("loggerA", action)
      // console.log("loggerA", getState())
      next(action)
    }
  }
}

const loggerB = function ({ getState }) {
  return next => {
    // console.log("loggerB", next)
    return action => {
      // console.log("loggerB", getState())
      // console.log("loggerB", action)
      next(action)
    }
  }
}

export default createStore(reducer, initialState, applyMiddleware(loggerA, loggerB));