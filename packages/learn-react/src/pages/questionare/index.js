import React, { useCallback, useReducer, useState } from "react";
import { connect } from "react-redux";
import generator from "../../models/question";
import "./index.scss";

export function Questionare({ hello }) {
    const questions = generator();
    const [done, setDone] = useState(false);
    const [points, dispatch] = useReducer(
        (state, action) => {
            state[action.type] = action.payload;
            return { ...state };
        },
        {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
        }
    );
    const handleOnChange = useCallback(
        (e, q) => {
            const type = Number.parseInt(q.point, 10);
            if (e.target.checked) {
                dispatch({ type, payload: points[type] + 1 });
            } else {
                dispatch({ type, payload: points[type] - 1 });
            }
        },
        [points]
    );
    return (
        <div>
            <h2>Questionare</h2>
            <ul className="questions">
                {questions.map((q, i) => (
                    <li className="item" key={i} data-point={q.point}>
                        <input
                            id={q.desc}
                            type="checkbox"
                            onChange={e => handleOnChange(e, q)}
                        />
                        <label htmlFor={q.desc}>{q.desc}</label>
                    </li>
                ))}
            </ul>
            <button
                className="done"
                onClick={() => {
                    hello();
                    setDone(true);
                }}
            >
                done
            </button>
            {done && (
                <div>
                    your class is：
                    <ul>
                        {Object.keys(points).map((k, i) => (
                            <li key={i}>{`${k}: ${points[k]}`}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default connect(null, dispatch => ({
    hello: () => dispatch({ type: "HELLO_SAGA" }),
}))(Questionare);
