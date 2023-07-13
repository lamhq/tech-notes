# Mocha

JavaScript test framework

## Installation

```shell
yarn add --dev mocha chai
```

Add `test` command to *package.json*

```json
{
  "scripts": {
    "test": "mocha"
  }
}
```

## Run order

```
describe("...", () => { ... })
  'before' root-level pre-hook
  'before' pre-hook
    'beforeEach' root-level pre-hook
    'beforeEach' pre-hook
    it("...", () => { ... })
    'afterEach' post-hook
    'afterEach' root-level post-hook
  'after' post-hook
  'after' root-level post-hooks
```


## Basic test

```js
var chai = require("chai");
var expect = chai.expect;
var capitalize = function (str) {
    var firstLetter = str[0].toUpperCase();
    var rest = str.slice(1).toLowerCase();
    return firstLetter + rest;
};
describe("testCapitalize", function() {
    it("capitalizes single words", function() {
        expect(capitalize("express")).to.equal("Express");
        expect(capitalize("cats")).to.equal("Cats");
        expect(capitalize("foo")).not.to.equal("foo");
        expect(function() { capitalize(123); }).to.throw(Error);
    });
});
```

### Run code before each code

```js
describe("User", function() {
    var user;
    beforeEach(function() {
        user = new User({
            firstName: "Douglas",
            lastName: "Reynholm",
            birthday: new Date(1975, 3, 20)
        });
    });
    it("can extract its name", function() {
        expect(user.getName()).to.equal("Douglas Reynholm");
    });
    it("can get its age in milliseconds", function() {
        var now = new Date();
        expect(user.getAge()).to.equal(now - user.birthday);
    });
});
```

## Http test

### Install supertest

```shell
npm install --save-dev supertest
```

### Install cherrio (jQuery DOM parser for nodejs)

```shell
npm install --save-dev cherrio
```

### Write test

```js
var app = require("../app");
var supertest = require("supertest");
var cheerio = require("cheerio");

describe("test get user agent service", function() {
    var request;
    beforeEach(function() {
        request = supertest(app)
            .get("/")
            .set("User-Agent", "my cool browser")
            .set("Accept", "text/plain");
    });

    it("returns a plain text response", function(done) {
        request
            .expect("Content-Type", /text\/plain/)
            .expect(200)
            .end(done);
    });

    it("returns your User Agent", function(done) {
        request
            .expect(function(res) {
                if (res.text !== "my cool browser") {
                    throw new Error("Response does not contain User Agent");
                }
            })
            .end(done);
    });

    it("returns your User Agent from html", function(done) {
        request
            .expect(function(res) {
                var htmlResponse = res.text;
                var $ = cheerio.load(htmlResponse);
                var userAgent = $(".user-agent").html().trim();
                if (userAgent !== "a cool browser") {
                    throw new Error("User Agent not found");
                }
            })
            .end(done);
    });
});

```