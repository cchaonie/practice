#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

yargs(hideBin(process.argv))
    .command(
        "list [path]",
        "列出指定目录下文件",
        yargs =>
            yargs.option("path", {
                alias: "p",
                describe: "待列举的目录",
                default: ".",
            }),
        require("./commands/list")
    )
    .command(
        "mkdir [name]",
        "在当前目录下创建文件夹",
        yargs =>
            yargs.option("name", {
                alias: "n",
                describe: "待创建的一个目录",
            }).option("dirNames", {
                describe: "包含待创建的目录名称的文件",
            }),
        require("./commands/mkdir")
    )
    .command(
        "touch [name]",
        "在当前目录下创建文件",
        yargs =>
            yargs.option("name", {
                alias: "n",
                describe: "待创建的一个文件名",
            }).option("fileNames", {
                describe: "包含待创建的文件名的文件",
            }),
        require("./commands/touch")
    )
    .check(argv => {
        const filePaths = argv._;
        if (!filePaths.length) {
            throw new Error("请输入子命令");
        } else {
            return true;
        }
    }).argv;
