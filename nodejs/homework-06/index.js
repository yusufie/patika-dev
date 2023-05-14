const Koa = require('koa');
const app = new Koa();
const port = 3000;

app.use(ctx => {

    if(ctx.path === '/') {
        ctx.status = 200;
        ctx.type = 'html';
        ctx.body = '<h1>INDEX SAYFASINA HOSGELDINIZ</h1>';
    }

    else if (ctx.path === '/hakkimda') {
        ctx.status = 200;
        ctx.type = 'html';
        ctx.body = '<h1>HAKKIMDA SAYFASINA HOSGELDINIZ</h1>';
    }

    else if (ctx.path === '/iletisim') {
        ctx.status = 200;
        ctx.type = 'html';
        ctx.body = '<h1>ILETISIM SAYFASINA HOSGELDINIZ</h1>';
    }

    else {
        ctx.status = 404;
        ctx.type = 'html';
        ctx.body = '<h1>404 SAYFA BULUNAMADI</h1>';
    }

});


app.listen(port, () => {
    console.log(`Koa Server started on ${port}`);
});