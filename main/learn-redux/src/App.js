import React from 'react';
import { connect } from 'react-redux';
import { addAsync, add, remove } from './actions';
import { ToolTip } from './component/toolitip';

export function App(props) {
    return (
        <>
            <h1>TODO</h1>
            <div>totalCount: {props.count}</div>
            <div>
                <button onClick={() => props.dispatch(addAsync(1))}>add</button>
            </div>
            <div>
                <button onClick={() => props.dispatch(remove(1))}>remove</button>
            </div>
            {
                ToolTip.call(this)
            }
        </>
    )
}

const mapStateToProps = state => ({...state})

export default connect(mapStateToProps)(App)