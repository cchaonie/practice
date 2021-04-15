import React, { useState, useCallback } from "react";
import { SizePicker, WindowListView } from "./components";
import { ListItemFactory } from "./models";

export default function App() {
    const generate = useCallback(
        (s?: number) => ListItemFactory.generateLargeList(s),
        []
    );
    const [largeList, setLargeList] = useState(generate());
    return (
        <div>
            <h1>Large List</h1>
            <SizePicker updateLargeList={size => setLargeList(generate(size))} />
            <WindowListView listData={largeList} />
        </div>
    );
}
