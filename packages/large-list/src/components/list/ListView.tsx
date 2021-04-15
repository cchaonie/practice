import React, { useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import "./index.scss";
import { isElementVisible } from "../../utils";
import { throttle } from "lodash";

export default function ListView({
    list,
    updateView,
    viewStartIndex,
    shouldReload,
}) {
    const listRef = useRef<HTMLUListElement>(null);
    const [status, setStatus] = useState("init");
    useEffect(() => {
        const ulEl = listRef.current;
        if (ulEl) {
            if (shouldReload) {
                const items = ulEl.children;
                let scrollDistances = 0;
                for (let i = 0; i <= viewStartIndex; i++) {
                    scrollDistances += items[i].getBoundingClientRect().height;
                }
                setStatus("scrolled");
                ulEl.scrollTo({ top: scrollDistances });
            }
        }
    }, [shouldReload, viewStartIndex]);

    useEffect(() => {
        const ulEl = listRef.current;
        let handler = e => {
            if (status === "init") {
                if (ulEl) {
                    let visibleStartIndex = 0;
                    const items = ulEl.children;
                    for (let i = 0; i < items.length; i++) {
                        if (isElementVisible(ulEl, items[i])) {
                            visibleStartIndex = i;
                            break;
                        }
                    }
                    updateView(visibleStartIndex);
                }
            } else {
                setStatus("init");
            }
        }

        if (ulEl) {
            ulEl.addEventListener("scroll", handler);
            return () => {
                ulEl.removeEventListener("scroll", handler);
            };
        }
        return () => {};
    }, [updateView, shouldReload, status]);

    return (
        <ul className="largeListContainer" ref={listRef}>
            {list.map((item, idx) => (
                <ListItem item={item} key={`${idx}- ${item.name}`} />
            ))}
        </ul>
    );
}
