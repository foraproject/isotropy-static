import __polyfill from "babel-polyfill";
import should from 'should';
import koa from "koa";
import http from "http";
import isotropyStatic from "../isotropy-static";

describe("Isotropy static", () => {

  const makeRequest = (host, port, path, method, headers, cb, onErrorCb) => {
    const options = { host, port, path, method, headers };

    let result = "";
    const req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function(data) { result += data; });
      res.on('end', function() { cb(result); });
    });
    req.on('error', function(e) { onErrorCb(e); });
    req.end();
  };

  it(`Must fetch a static file`, () => {
    const app = new koa();
    app.use(isotropyStatic(__dirname + "/icles"));

    const promise = new Promise((resolve, reject) => {
      app.listen(function(err) {
        if (err) {
          reject(err);
        }
        makeRequest("localhost", this.address().port, "/hello.txt", "GET", {}, resolve, reject);
      });
    });

    return promise.then((result) => {
      result.should.equal("hello, world\n")
    });
  });


  it(`Must fetch index.html if filename is not provided`, () => {
    const app = new koa();
    app.use(isotropyStatic(__dirname + "/icles"));

    const promise = new Promise((resolve, reject) => {
      app.listen(function(err) {
        if (err) {
          reject(err);
        }
        makeRequest("localhost", this.address().port, "", "GET", {}, resolve, reject);
      });
    });

    return promise.then((result) => {
      result.should.equal("hello, index\n")
    });
  });


  it(`Must fetch specified index file if provided`, () => {
    const app = new koa();
    app.use(isotropyStatic(__dirname + "/icles", { index: "alt-index.html" }));

    const promise = new Promise((resolve, reject) => {
      app.listen(function(err) {
        if (err) {
          reject(err);
        }
        makeRequest("localhost", this.address().port, "", "GET", {}, resolve, reject);
      });
    });

    return promise.then((result) => {
      result.should.equal("hello, alt\n")
    });
  });


  it(`Must fetch file in a sub-directory`, () => {
    const app = new koa();
    app.use(isotropyStatic(__dirname + "/icles"));

    const promise = new Promise((resolve, reject) => {
      app.listen(function(err) {
        if (err) {
          reject(err);
        }
        makeRequest("localhost", this.address().port, "/inner/world.txt", "GET", {}, resolve, reject);
      });
    });

    return promise.then((result) => {
      result.should.equal("hello, world?\n")
    });
  });
});
