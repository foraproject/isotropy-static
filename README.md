# isotropy-static
Static file handler for koa with an ES7 async/await (or promises) based API.
This is very similar to koa-static, but doesn't use generators.

Usage
-----

Install it via npm
```
npm install isotropy-static
```

Use it with koa.
```
const app = new koa();
app.use(isotropyStatic(__dirname + "/icles"));
app.listen();
```

You can see more examples in the test/ directory.
