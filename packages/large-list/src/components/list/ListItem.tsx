import React from "react";
import "./index.scss";
export default function ListItem({ item }) {
    return (
        <li className="listItem" data-itemname={item.name}>
            <p>{item.name}</p>
            <p>{item.description}</p>
        </li>
    );
}
