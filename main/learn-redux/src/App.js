import React from 'react';
import { connect } from 'react-redux';
import { add, remove } from './actions';

export function App(props) {
    return (
        <>
            <h1>TODO</h1>
            <div>totalCount: {props.count}</div>
            <div>
                <button onClick={() => props.dispatch(add(1))}>add</button>
            </div>
            <div>
                <button onClick={() => props.dispatch(remove(1))}>remove</button>
            </div>
        </>
    )
}

const mapStateToProps = state => ({...state})

export default connect(mapStateToProps)(App)