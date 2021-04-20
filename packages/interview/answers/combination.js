/**
 * @param  {...string[][]} args 
 */
function combination(...args) {
    const result = [];
    const backtrack = (ops, selection) => {
        if (selection.length === args.length) {
            result.push(selection);
            return;
        }
        for (let op of ops) {
            const newStr = selection + op;
            const newOps = args[newStr.length];
            backtrack(newOps, newStr);
        }
    }
    backtrack(args[0], "");
    return result;
}

combination(["a", "b"],['A','B'],['1','0'])