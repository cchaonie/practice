import randomWord from "randomword";

class ListItem {
    name: string;
    description: string;
    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

class ListItemFactory {
    static largeList: ListItem[];

    static generateLargeList(size?: number) {
        if (ListItemFactory.largeList && ListItemFactory.largeList.length) {
            return ListItemFactory.largeList;
        }
        const largeList = new Array(size ? size : 2000);
        for (let i = 0; i < largeList.length; i++) {
            largeList[i] = new ListItem(randomWord(3), randomWord(30));
        }
        ListItemFactory.largeList = largeList;
        return largeList;
    }

    static reset() {
        ListItemFactory.largeList = [];
    }
}

export default ListItemFactory;
