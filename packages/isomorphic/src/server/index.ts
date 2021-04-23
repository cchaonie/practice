import Koa from "koa";

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(async ctx => {
    ctx.body = "hello Koa";
});

app.listen(port, () => console.log(`server is listening at ${port}`));
