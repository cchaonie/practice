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

const loggerA = function() {
  return ({
    getState
  }) => {
    console.log("loggerA: in getState")
    return next => {
      console.log("loggerA: in next")
      return action => {
        console.log("loggerA: in action")
        console.log("loggerA:", getState())
        next(action)
      }
    }
  }
}

const loggerB = function() {
  return ({
    getState
  }) => {
    console.log("loggerB: in getState")
    return next => {
      console.log("loggerB: in next")
      return action => {
        console.log("loggerB: in action")
        console.log("loggerB:", getState())
        next(action)
      }
    }
  }
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

console.log(compose(loggerA, loggerB))
console.log(applyMiddleware(loggerA, loggerB))

export default createStore(reducer, initialState, applyMiddleware(loggerA, loggerB));