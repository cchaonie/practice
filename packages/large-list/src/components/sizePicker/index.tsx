import React, { useState } from "react";

export function SizePicker({ updateLargeList }) {
    const [size, setSize] = useState(2000);

    return (
        <>
            <input
                type="number"
                value={size}
                onChange={e => {
                    setSize(Number.parseInt(e.target.value, 10));
                }}
            />
            <button
                onClick={() => {
                    updateLargeList(size);
                }}
            >
                refresh
            </button>
        </>
    );
}
