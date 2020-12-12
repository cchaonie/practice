"use strict";

(function () {
    const cons = [
        "b",
        "c",
        "d",
        "g",
        "h",
        "j",
        "k",
        "l",
        "m",
        "n",
        "p",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "tr",
        "cr",
        "br",
        "fr",
        "th",
        "dr",
        "ch",
        "ph",
        "wr",
        "st",
        "sp",
        "sw",
        "pr",
        "sl",
        "cl",
    ];
    const num_cons = cons.length;

    window.randomword = _length => {
        let length = Math.min(_length, num_cons);
        let word = [];
        for (let i = 0; i < length; i++) {
            word.push(cons[Math.floor(Math.random() * 1000) % num_cons]);
        }

        return word.join("").substr(0, length);
    };
})();

class ListItem {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    static generateLargeList(size) {
        const largeList = new Array(size);
        for (let i = 0; i < largeList.length; i++) {
            largeList[i] = new ListItem(randomword(3), randomword(30));
        }
        return largeList;
    }
}

window.onload = function () {
    const generate = s => ListItem.generateLargeList(s);
    const getUlChildren = list => {
        const fragment = document.createDocumentFragment();
        for (let listItem of list) {
            const $li = document.createElement("li");
            $li.innerHTML = `<p>${listItem.name}</p><p>${listItem.description}</p>`;
            $li.classList.add("listItem");
            fragment.appendChild($li);
        }
        return fragment;
    };
    const $input = document.getElementById("sizeInput");
    const $refreshBtn = document.getElementById("refreshBtn");
    const $listUl = document.getElementById("listUl");

    let listSize = 20;
    let largetList = generate(listSize);

    $input.value = listSize;
    $input.addEventListener("change", e => {
        listSize = Number.parseInt(e.target.value, 10);
    });
    $refreshBtn.addEventListener("click", () => {
        largetList = generate(listSize);
        $listUl.replaceChildren(getUlChildren(largetList));
    });
    $listUl.append(getUlChildren(largetList));
};
